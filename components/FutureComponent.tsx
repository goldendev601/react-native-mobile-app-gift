import * as React from 'react';
import {
  ScrollView,
  StyleSheet,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Table, Row } from 'react-native-table-component';
import { SvgUri } from 'react-native-svg';

import {
  Text,
  TouchableWithNavigation,
  View,
  ViewProps,
  useThemeColor,
} from './Themed';
import {
  Game,
  GameOdd,
  BettingMarket,
  SportBook,
  BettingOutcome,
} from '../types';
import { SportBookItemType } from '../types/Sportsbooks';
import * as API from '../services/api';

type BetStyle = 'modern' | 'vegas' | 'classic' | undefined;
type Market = 'Spread' | 'MoneyLine' | 'OverUnder' | undefined;

interface FutureComponentProps extends ViewProps {
  betStyle?: BetStyle;
  market?: Market;
  league?: string;
  data: BettingMarket[];
  showConsensus?: boolean;
}

type FutureComponentState = {
  showSecondCol: boolean;
  providers: SportBookItemType[];
  futures: BettingMarket[];
  rendering: boolean;
  mainScrollPosition: number;
};
/**
 * Following values came from https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2
 */
const RUWT_ENABLE_OUTBOUND_LINKS = true;
const RUWT_REDIRECT_URL = 'https://thelines.go.metabet.io/bet/';
const RUWT_SITE_FAMILY_CATENA = true;
const RUWT_STALE_ODDS_CUTOFF = 1000 * 60 * 60 * 24 * 60;

export default class FutureComponent extends React.Component<
  FutureComponentProps,
  FutureComponentState
> {
  static defaultProps = {
    betStyle: 'classic',
    showConsensus: false,
  };

  state = {
    showSecondCol: false,
    providers: new Array<SportBookItemType>(),
    futures: new Array<BettingMarket>(),
    rendering: false,
    mainScrollPosition: 0,
  };

  componentDidMount() {
    this.setState({ rendering: true });
    this.getFutureData();
  }

  /** 1000 => 1,000 */
  numberWithCommas(x: string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  getSign(num: number) {
    if (num > 0) {
      return '+';
    }
    return '';
  }

  async mb_getProvidersForLocation() {
    let providers: SportBookItemType[] = await API.getSportsbooks();
    const filtered: SportBookItemType[] = providers.filter(
      (item: SportBookItemType) => !!item.logo
    );
    const ruleAry = {
      DraftKings: 1,
      BetMGM: 2,
      'Caesars Sportsbook': 3,
      FanDuel: 4,
      UNIBET: 5,
      PointsBet: 6,
      FoxBet: 7,
      SugarHouse: 8,
      '888Sportsbook': 9,
    };

    let nicNames: string[] = [];
    for (let i = 0; i < filtered.length; i++) {
      const element = filtered[i];
      if (!nicNames.includes(element.nice_name)) {
        nicNames.push(element.nice_name);
      } else {
        filtered.splice(i, 1);
        continue;
      }
      element.sortId = ruleAry[element.nice_name]
        ? ruleAry[element.nice_name]
        : 100;
    }
    filtered.sort((a, b) => {
      if (!!!a.sortId && !!!b.sortId) {
        return 1;
      } else if (!!!a.sortId && b.sortId) {
        return -1;
      } else if (a.sortId && b.sortId) {
        return a.sortId - b.sortId;
      }
      return 1;
    });
    return filtered;
  }

  /**
   * Please refer https://go.metabet.io/js/global.js?siteID=thelines&ver=5.7.2, Line 1957
   */
  async getFutureData() {
    let providers = await this.mb_getProvidersForLocation();
    for (let i = 0; i < providers.length; i++) {
      const element = providers[i];
      switch (element.SportsDataId) {
        case 7:
          element.review_link =
            'https://sportsbook.draftkings.com/acq-50-free-bet';
          break;
        case 21:
          element.review_link =
            'https://promo.nj.betmgm.com/en/promo/geolocator?orh=promo.betmgm.com&wm=7038459';
          break;
        case 19:
          element.review_link =
            'https://www.williamhill.com/us/nj/welcome?AR=a-894b-191&bc=LEGALRF&utm_offer=LEGALRF&siteid=894&af_c_id=LEGALRF';
          break;
        case 8:
          element.review_link =
            'https://account.sportsbook.fanduel.com/join/select-state';
          break;
        case 23:
          element.review_link =
            'https://join.pointsbet.com/catena-2rf/?utm_source=Unbounce_Catena_Media&utm_medium=Digital_Affiliate_Revenue_Share&utm_campaign=Risk_Free_2_1500_500_Catena_Media&utm_term=Unbounce&utm_content=Catena_Media&promo=BETBONUS';
          break;
        case 10:
          element.review_link =
            'https://www.playsugarhouse.com/?page=landing&cbc=PLAY250&btag=a_493b_250c_&siteid=493#home';
          break;
        case 25:
          element.review_link =
            'https://nj.unibet.com/p/30free/?utm_source=affiliate&utm_medium=affiliate&utm_campaign=affiliate&btag=a_1251b_385c_142603101';
          break;
        case 13:
          element.review_link =
            'https://www.888sport.com/online-sports-betting-promotions/';
          break;
        default:
          break;
      }
    }
    // Add empty string into providers for row header cell
    const virtualProvider = {
      _id: -1,
      SportsDataId: -1,
      Sportsbook: '',
      list_offer: false,
      nice_name: '',
    };
    providers.unshift(virtualProvider);
    if (this.props.data.length == 1) {
      const sorted = this.props.data[0].BettingOutcomes.sort(
        (a: BettingOutcome, b: BettingOutcome) => {
          for (let index = 1; index < providers.length; index++) {
            const element = providers[index];
            if (
              !a.SportsBooks.map((item) => item.SportsbookID).includes(
                element.SportsDataId
              ) ||
              !b.SportsBooks.map((item) => item.SportsbookID).includes(
                element.SportsDataId
              )
            ) {
              continue;
            } else {
              const aSportBook = a.SportsBooks.find(
                (s) => s.SportsbookID === element.SportsDataId
              );
              const bSportBook = b.SportsBooks.find(
                (s) => s.SportsbookID === element.SportsDataId
              );
              if (aSportBook && bSportBook) {
                if (aSportBook.PayoutAmerican < bSportBook.PayoutAmerican) {
                  return -1;
                }
                if (aSportBook.PayoutAmerican == bSportBook.PayoutAmerican) {
                  return a.Participant < b.Participant ? -1 : 1;
                }
              }
              break;
            }
          }
          return 1;
        }
      );
      this.props.data[0].BettingOutcomes = sorted;
    }
    const futures = [...this.props.data];
    const _providers = providers.filter((provider) => {
      for (let index = 0; index < futures.length; index++) {
        const future = futures[index];
        const temp =
          future.BettingBetTypeID == 11
            ? [future.BettingOutcomes[0]]
            : future.BettingOutcomes;
        for (let _index = 0; _index < temp.length; _index++) {
          const market = temp[_index];
          let filtered;
          if (provider.SportsDataId == -1) {
            return true;
          } else {
            if (future.BettingBetTypeID !== 11) {
              filtered = market.SportsBooks.filter((sportbook: SportBook) => {
                if (!sportbook.SportsbookName || !provider.nice_name) {
                  return false;
                }
                return provider.nice_name
                  .toLowerCase()
                  .includes(sportbook.SportsbookName.toLowerCase());
              });
            } else {
              filtered = future.BettingOutcomes.filter((item) => {
                return item.SportsBook?.SportsbookID == provider.SportsDataId;
              });
            }
            if (filtered.length == 0) {
              return false;
            }
          }
        }
      }
      return true;
    });
    this.setState({ providers: _providers, futures });
  }

  renderNoOdds() {
    return (
      <View style={styles.emptyOdds}>
        <Text
          style={styles.errorText}
        >{`We don't have any odds for upcoming ${this.props.league} games.`}</Text>
      </View>
    );
  }

  renderImage(id: number) {
    if (id === 7) {
      return (
        <Image
          source={require('../assets/images/DraftKings.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      );
    }
    if (id === 21) {
      return (
        <Image
          source={require('../assets/images/BetMGM.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      );
    }
    if (id === 8) {
      return (
        <Image
          source={require('../assets/images/FanDuel.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      );
    }
    if (id === 23) {
      return (
        <Image
          source={require('../assets/images/PointsBet.png')}
          style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
        />
      );
    }
    return null;
  }

  renderProviderCell(provider: SportBookItemType) {
    const isSVG = provider.logo && provider.logo.slice(-4).includes('svg');
    return (
      <TouchableWithNavigation url={provider.affiliate_link}>
        {provider && provider.logo ? (
          <View style={styles.gameCellStyle}>
            <View style={styles.providerLogo}>
              {isSVG ? (
                this.renderImage(provider._id)
              ) : (
                <Image
                  source={{ uri: provider.logo }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              )}
            </View>
            <View style={{ height: 40 }}>
              <Text style={styles.providerPromo}>{provider.bonus_text}</Text>
            </View>
          </View>
        ) : (
          <View />
        )}
      </TouchableWithNavigation>
    );
  }

  renderFirstColumn(future: BettingMarket, market: BettingOutcome) {
    return (
      <View style={styles.gameCellStyle}>
        <Text style={styles.gameCellTextStyle}>
          {future.BettingMarketType === 'Team Future' &&
            (future.TeamKey || market.Participant)}
          {future.BettingMarketType === 'Player Future' && future.PlayerName}
        </Text>
      </View>
    );
  }

  renderTwoValueCell(filtered: SportBook[]) {
    let backgroundColor = '#fff';
    let color = '#101010';
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text style={[styles.oddsCellText, { color }]}>
            {`${this.getSign(
              filtered[0]?.PayoutAmerican
            )}${filtered[0]?.PayoutAmerican.toString()} `}
            <Text style={[styles.oddsCellText, { color }]}>No</Text>
          </Text>
        </View>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text style={[styles.oddsCellText, { color }]}>
            {`${this.getSign(
              filtered[1]?.PayoutAmerican
            )}${filtered[1]?.PayoutAmerican.toString()} `}
            <Text style={[styles.oddsCellText, { color }]}>Yes</Text>
          </Text>
        </View>
      </View>
    );
  }

  renderOneValueCell(filtered: SportBook[]) {
    let backgroundColor = '#fff';
    let color = '#101010';
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text style={[styles.oddsCellText, { color }]}>
            {`${this.getSign(
              filtered[0]?.PayoutAmerican
            )}${filtered[0]?.PayoutAmerican.toString()} `}
          </Text>
        </View>
      </View>
    );
  }
  renderOverCell(
    filtered: SportBook[],
    market: BettingOutcome,
    provider: SportBookItemType
  ) {
    let backgroundColor = '#fff';
    let color = '#101010';
    const value = filtered[0].Value
      ? filtered[0].Value
      : market.Participant.slice(5).replace(',', '.');
    if (!!!value) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text
            style={[styles.oddsCellText, { color }]}
          >{`O ${value} ${this.getSign(filtered[0].PayoutAmerican)}${
            filtered[0].PayoutAmerican
          }`}</Text>
        </View>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text style={[styles.oddsCellText, { color }]}>
            <Text
              style={[styles.oddsCellText, { color }]}
            >{`U ${value} ${this.getSign(filtered[1].PayoutAmerican)}${
              filtered[1].PayoutAmerican
            }`}</Text>
          </Text>
        </View>
      </View>
    );
  }

  renderUnderCell(
    filtered: SportBook[],
    market: BettingOutcome,
    provider: SportBookItemType
  ) {
    let backgroundColor = '#fff';
    let color = '#101010';
    const value = filtered[0].Value
      ? filtered[0].Value
      : market.Participant.slice(5).replace(',', '.');
    if (!!!value) {
      return null;
    }
    return (
      <View style={{ paddingHorizontal: 8 }}>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text
            style={[styles.oddsCellText, { color }]}
          >{`O ${value} ${this.getSign(filtered[1].PayoutAmerican)}${
            filtered[1].PayoutAmerican
          }`}</Text>
        </View>
        <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
          <Text style={[styles.oddsCellText, { color }]}>
            <Text
              style={[styles.oddsCellText, { color }]}
            >{`U ${value} ${this.getSign(filtered[0].PayoutAmerican)}${
              filtered[0].PayoutAmerican
            }`}</Text>
          </Text>
        </View>
      </View>
    );
  }

  renderNoTypeCell(
    filtered: SportBook[],
    market: BettingOutcome,
    provider: SportBookItemType
  ) {
    let backgroundColor = '#fff';
    let color = '#101010';
    return (
      <TouchableWithNavigation url={provider.affiliate_link}>
        <View style={styles.gameCellStyle}>
          <View style={[styles.oddsCellTextWrapper, { backgroundColor }]}>
            <Text style={[styles.oddsCellText, { color }]}>{`${this.getSign(
              filtered[0].PayoutAmerican
            )}${filtered[0].PayoutAmerican.toString()}`}</Text>
          </View>
          <View>
            <Text style={styles.oddsBetButton}>Make a Bet</Text>
          </View>
        </View>
      </TouchableWithNavigation>
    );
  }

  render() {
    const { providers, futures } = this.state;
    const { showSecondCol } = this.state;

    console.log('state', this.state);
    // Show an empty message and exit if we don't have games to show
    if (futures.length == 0 || providers.length == 0) {
      if (this.state.rendering) {
        return (
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
      }
      return this.renderNoOdds();
    }

    // Add empty string into providers for row header cell

    const headerColumnWidth = 84,
      dataColumnWidth = 106;
    let widthArr = Array(providers.length);
    widthArr.fill(dataColumnWidth);
    widthArr[0] = headerColumnWidth;
    const rowHeight = 100;
    return (
      <View style={styles.container}>
        {showSecondCol && (
          <View style={{ width: headerColumnWidth }}>
            <View
              style={[
                styles.borderStyle,
                { height: 101, width: headerColumnWidth },
              ]}
            />
            <ScrollView
              ref={'headerScroll'}
              scrollEventThrottle={16}
              style={[styles.dataWrapper, { width: headerColumnWidth }]}
              onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                if (!!!this.refs.mainScroll) {
                  return;
                }
                this.refs.mainScroll.scrollTo({
                  y: e.nativeEvent.contentOffset.y,
                  animated: false,
                });
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                if (!!!this.refs.headerScroll) {
                  return;
                }
                this.refs.headerScroll.scrollTo({
                  y: this.state.mainScrollPosition,
                  animated: false,
                });
              }}
            >
              <Table borderStyle={styles.borderStyle}>
                {futures.map((future: BettingMarket, index: number) => {
                  return future.BettingOutcomes.map((market, _index) => (
                    <Row
                      key={_index}
                      style={{ height: rowHeight }}
                      data={[this.renderFirstColumn(future, market)]}
                    />
                  ));
                })}
              </Table>
            </ScrollView>
          </View>
        )}
        <ScrollView
          horizontal
          scrollEventThrottle={16}
          onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
            if (
              e.nativeEvent.contentOffset.x > headerColumnWidth &&
              !showSecondCol
            ) {
              this.setState({ showSecondCol: true });
            }
            if (
              e.nativeEvent.contentOffset.x < headerColumnWidth &&
              showSecondCol
            ) {
              this.setState({ showSecondCol: false });
            }
          }}
          ref={'horizontal'}
        >
          <View>
            <Table borderStyle={styles.borderStyle}>
              <Row
                data={providers.map((provider: SportBookItemType) =>
                  this.renderProviderCell(provider)
                )}
                widthArr={widthArr}
                style={styles.rowStyle}
              />
            </Table>
            <ScrollView
              style={styles.dataWrapper}
              ref={'mainScroll'}
              scrollEventThrottle={16}
              onScroll={(e: NativeSyntheticEvent<NativeScrollEvent>) => {
                if (!!!this.refs.headerScroll) {
                  return;
                }
                this.refs.headerScroll.scrollTo({
                  y: e.nativeEvent.contentOffset.y,
                  animated: false,
                });
              }}
              onMomentumScrollEnd={(e) => {
                this.setState({
                  mainScrollPosition: e.nativeEvent.contentOffset.y,
                });
              }}
            >
              <Table borderStyle={styles.borderStyle}>
                {futures.map((future: BettingMarket, index: number) => {
                  const temp =
                    future.BettingBetTypeID == 11
                      ? [future.BettingOutcomes[0]]
                      : future.BettingOutcomes;
                  return temp.map((market, _index) => (
                    <Row
                      key={_index}
                      style={{ height: rowHeight }}
                      data={providers.map(
                        (provider: SportBookItemType, index: number) => {
                          if (index == 0) {
                            return this.renderFirstColumn(future, market);
                          } else {
                            if (future.BettingBetTypeID !== 11) {
                              const filtered = market.SportsBooks.filter(
                                (sportbook: SportBook) => {
                                  if (
                                    !sportbook.SportsbookName ||
                                    !provider.nice_name
                                  ) {
                                    return false;
                                  }
                                  return provider.nice_name
                                    .toLowerCase()
                                    .includes(
                                      sportbook.SportsbookName.toLowerCase()
                                    );
                                }
                              );
                              if (filtered?.length > 0) {
                                if (
                                  market.BettingOutcomeType == 'Yes' ||
                                  market.BettingOutcomeType == 'No'
                                ) {
                                  return (
                                    <TouchableWithNavigation
                                      url={provider.affiliate_link}
                                    >
                                      <View style={styles.gameCellStyle}>
                                        {filtered.length == 2 &&
                                          this.renderTwoValueCell(filtered)}
                                        {filtered.length == 1 &&
                                          this.renderOneValueCell(filtered)}
                                        <Text style={[styles.oddsBetButton]}>
                                          Make a Bet!
                                        </Text>
                                      </View>
                                    </TouchableWithNavigation>
                                  );
                                }
                                if (market.BettingOutcomeType == 'Over') {
                                  const OverCell = this.renderOverCell(
                                    filtered,
                                    market,
                                    provider
                                  );
                                  if (OverCell) {
                                    return (
                                      <TouchableWithNavigation
                                        url={provider.affiliate_link}
                                      >
                                        <View style={styles.gameCellStyle}>
                                          {OverCell}
                                          <Text style={[styles.oddsBetButton]}>
                                            Make a Bet!
                                          </Text>
                                        </View>
                                      </TouchableWithNavigation>
                                    );
                                  }
                                  return null;
                                }
                                if (market.BettingOutcomeType == 'Under') {
                                  const UnderCell = this.renderUnderCell(
                                    filtered,
                                    market,
                                    provider
                                  );
                                  if (UnderCell) {
                                    return (
                                      <TouchableWithNavigation
                                        url={provider.affiliate_link}
                                      >
                                        <View style={styles.gameCellStyle}>
                                          {UnderCell}
                                          <Text style={[styles.oddsBetButton]}>
                                            Make a Bet!
                                          </Text>
                                        </View>
                                      </TouchableWithNavigation>
                                    );
                                  }
                                  return null;
                                }
                                if (!!!market.BettingOutcomeType) {
                                  return this.renderNoTypeCell(
                                    filtered,
                                    market,
                                    provider
                                  );
                                }
                              }
                              return null;
                            } else {
                              const filtered = future.BettingOutcomes.filter(
                                (item) => {
                                  return (
                                    item.SportsBook?.SportsbookID ==
                                    provider.SportsDataId
                                  );
                                }
                              );
                              let backgroundColor = '#fff';
                              let color = '#101010';
                              if (filtered.length == 0) {
                                return null;
                              }
                              return (
                                <TouchableWithNavigation
                                  url={provider.affiliate_link}
                                >
                                  <View style={styles.gameCellStyle}>
                                    {filtered.map((outCome, index) => (
                                      <View
                                        key={index}
                                        style={[
                                          styles.oddsCellTextWrapper,
                                          { backgroundColor },
                                        ]}
                                      >
                                        <Text
                                          style={[
                                            styles.oddsCellText,
                                            { color },
                                          ]}
                                        >{`${this.getSign(
                                          outCome.PayoutAmerican
                                        )}${outCome.PayoutAmerican} ${
                                          outCome.BettingOutcomeType
                                        }`}</Text>
                                      </View>
                                    ))}
                                    <Text style={[styles.oddsBetButton]}>
                                      Make a Bet!
                                    </Text>
                                  </View>
                                </TouchableWithNavigation>
                              );
                            }
                          }
                        }
                      )}
                      widthArr={widthArr}
                    />
                  ));
                })}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  emptyOdds: {
    alignItems: 'center',
    width: '90%',
  },
  errorText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  borderStyle: {
    borderColor: '#474747',
    borderWidth: 1,
  },
  dataWrapper: {
    marginTop: -1,
  },
  rowStyle: {
    height: 100,
  },
  cellStyle: {
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerLogo: {
    backgroundColor: 'white',
    borderRadius: 12,
    height: 25,
    width: 88,
    paddingLeft: 13,
    paddingRight: 13,
    overflow: 'hidden',
  },
  providerPromo: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 15,
    paddingTop: 8,
    textAlign: 'center',
  },
  gameCellStyle: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  gameCellTextStyle: {
    fontWeight: '800',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 1.5,
    paddingTop: 4,
    paddingBottom: 4,
    textAlign: 'center',
  },
  row: {
    height: 28,
  },
  oddsCellTextWrapper: {
    borderRadius: 2,
    height: 20,
    marginBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  oddsCellText: {
    fontSize: 10,
    lineHeight: 15,
    marginLeft: 2.5,
    marginRight: 2.5,
    textAlign: 'center',
  },
  oddsBetButton: {
    textAlign: 'center',
    fontSize: 10,
    lineHeight: 15,
    textDecorationLine: 'underline',
  },
});
