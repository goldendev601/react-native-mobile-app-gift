import {
    GET_CONTACT_LIST_SUCCESS,
    GET_DASHBOARD_INFO_SUCCESS,
    GET_EVENT_LIST_SUCCESS,
    ADD_CONTACT_SUCCESS,
    IMPORT_CONTACTS_SUCCESS,
    UPDATE_CONTACT_SUCCESS,
    GENERATE_TOKEN_SUCCESS,
    ADD_PAYMENT_METHOD_SUCCESS,
    ADD_GIFT_SUCCESS,
    ADD_EVENT_SUCCESS,
    ADD_THANK_YOU_SUCCESS,
    UPDATE_THANK_YOU_SUCCESS,
    PAY_THANK_YOU_SUCCESS,
    UPDATE_EVENT_SUCCESS,
    ADD_MEMBER_SUCCESS,
    SET_MEMBER_SUCCESS,
    GET_MEMBER_SUCCESS,
    DELETE_MEMBER_SUCCESS,
    GET_GIFT_CATEGORIES_SUCCESS,
    GET_GIFT_COLORS_SUCCESS,
    GET_GIFT_FONTS_SUCCESS,
    GET_CARD_TYPES_SUCCESS,
    GET_GIFT_PICTURES_SUCCESS,
    GET_CUSTOM_PICTURES_SUCCESS,
    GET_TRANSACTION_DETAIL_SUCCESS,
    SET_GIFT_INFO,
    SET_CONTACT_INFO,
    SET_IMPORTED_CONTACT_INFO,
    SET_MEMBERS_INFO,
    SET_THANK_YOU_MEMBERS_INFO,
    SET_EVENT_MEMBERS_INFO,
    SET_DATE_INFO,
    SET_EVENT_INFO,
    SET_EVENT_DETAIL_INFO,
    GET_MY_PROFILE_SUCCESS,
    GET_GIFTS_RECEIVED_SUCCESS,
    GET_TRANSACTIONS_SUCCESS,
    GET_EVENT_TYPES_SUCCESS,
    GET_CURRENCY_TYPES_SUCCESS,
    GET_EVENT_DETAIL_SUCCESS,
    GET_PAYMENT_METHODS_SUCCESS,
    SET_SELECTED_PAYMENT_METHOD,
    DELETE_PAYMENT_METHOD_SUCCESS,
    DELETE_CONTACT_SUCCESS,
    CLEAR_PAYMENT_METHOD_STATE,
    CLEAR_EVENT_STATE,
    CLEAR_CONTACT_STATE,
    CLEAR_DELETE_CONTACT_STATE,
    CLEAR_THANKS_NOTE_STATE,
    TRANSACTION_SEND_SUCCESS,
    EVENT_LOADING,
    EVENT_FAILED,
    THANK_YOU_LOADING,
    THANK_YOU_FAILED,
    GET_FAVORITE_CONTACT_LIST_SUCCESS,
    SET_PAYMENT_METHOD_LOADING,
    SET_DASHBOARD_INFO_LOADING,
    SET_THANKS_NOTE_INFO,
    PAY_THANK_YOU_FAILED,
    SET_MEMBERS_THANK_YOU_SUCCESS,
    TRANSACTION_SEND_FAILED,
    CLEAR_TRANSACTION_STATE,
    CLEAR_THANKS_STATE,
    GET_STRIPE_DASHBOARD_SUCCESS,
    CLEAR_STRIPE_DASHBOARD_INFO,
    GENERATE_TOKEN_BANK_SUCCESS,
    VERIFY_BANK_ACCOUNT_SUCCESS,
    ADD_THANK_YOU_SUCCESS_1,
    CONTACT_US_SUCCESS,
    CLEAR_CONTACT_US_STATE,
    SET_STRIPE_TOKEN_ID,
    CLEAR_TRANSACTION_DETAIL_SUCCESS,
    GET_ALL_EVENT_LIST_SUCCESS,
    GET_INVITED_EVENT_LIST_SUCCESS
} from '../actions/giftAppAction';

export interface Contact {
    id: number;
    name: string
    email: string
    first_name: string
    last_name: string
    phone: string
    owner_id: number
    created_at: string
    updated_at: string,
    is_favourite: boolean
}

export interface GiftCatetory {
    id: number;
    description: string
    image_relative_url: string
    image_url: string,
    bg_color: string
}

export interface Event {
    id: number;
    name: string
    event_date: string
    message: string
    archived: boolean
    owner_id: number
    event_type_id: number,
    created_at: string
    updated_at: string,
    image_relative_url: string,
    events_members_count: number,
    events_members: any,
    image_url: string,
    event_type: any
}

export interface Thankyou {
    id: number;
    events_id: number;
    event: string;
    payment_completed: boolean;
    sent: boolean;
    message: string;
    amount: number;
    fee_amount: number;
    total_amount: number;
    contacts: any;
}

export interface EventDetailInfo {
    id: number;
    name: string;
    event_date: string;
    message: string;
    archived: boolean;
    event_type_id: number;
    event_type: string;
    image_url: string;
    events_members: any;
    qr_code_url: string;
}

export interface GiftReceived {
    id: number;
    receiver: any;
    receiver_email: string;
    receiver_user_id: any;
    events_id: any;
    gift_category: string,
    gift_picture: string,
    gift_color: string,
    gift_primary_font: string,
    gift_secondary_font: string,
    gift_status: string,
    gift_pictures_id: number,
    gift_colors_id: number,
    gift_primary_fonts_id: number,
    gift_secondary_fonts_id: number,
    gift_status_id: number,
    amount: number,
    message: string,
    application_fee_amount: any,
    total_amount: any,
    owner_id: number,
    sender: string,
    sender_email: string,
}

export interface Transaction {
    id: number;
    colleague_name: string;
    colleague_email: string;
    flagged_total_amount: number,
    gift_status: string,
    gift_status_id: number,
    updated_at: string
}

export interface GiftColor {
    id: number;
    description: string;
    hex_color: string;
}

export interface EventType {
    id: number;
    description: string;
    image_relative_url: string;
    image_url: string;
    bg_color: string;
}

export interface CurrencyType {
    id: number;
    description: string;
}

export interface GiftFont {
    id: number;
    description: string;
}

export interface CardType {
    id: number;
    description: string;
    fee_amount: number;
}

export interface GiftPicture {
    id: number;
    gift_categories_id: number;
    description: string;
    image_relative_url: string;
    image_url: string;
    is_custom: boolean;
}

export interface CustomPicture {
    id: number;
    gift_categories_id: number;
    description: string;
    image_relative_url: string;
    image_url: string;
    is_custom: boolean;
}

// export interface GiftInfo {
//     gift_categories_id: number;
//     gift_pictures_id: number;
//     gift_colors_id: number;
//     gift_primary_fonts_id: number;
//     amount: number;
//     contacts_id: number;
//     gift_secondary_fonts_id: number;
//     message: string;
// }

export interface GiftInfo {
    card_type_id: number;
    gift_category: GiftCatetory;
    gift_picture: GiftPicture;
    gift_color: GiftColor;
    gift_primary_font: GiftFont;
    amount: number;
    gift_contact: Contact;
    gift_secondary_font: GiftFont;
    message: string;
}

export interface MyProfile {
    id: number;
    name: string;
    email: string;
    first_name: string;
    last_name: string;
    image_url: string;
    phone: string;
    date_of_birth: string;
    role_id: number;
    preferred_timezone_tzab: string;
    account_status_id: number;
    default_currency_id: number;
    role: string;
    currency_type: string;
    user_stripe_account: string
}

export interface DashboardInfo {
    total_received: number;
    upcoming_events: [],
    latest_gifts: []
}

export interface TransactionDetail {
    colleague_name: string;
    colleague_email: string;
    flagged_total_amount: number;
    id: number;
    receiver: string;
    receiver_email: string;
    event: any;
    gift_category: string;
    gift_picture: string;
    gift_color: string;
    gift_primary_font: string;
    gift_secondary_font: string;
    gift_status: string;
    gift_pictures_id: number;
    gift_colors_id: number;
    gift_primary_fonts_id: number;
    gift_secondary_fonts_id: number;
    gift_status_id: number;
    amount: number;
    message: string;
    application_fee_amount: number;
    total_amount: number;
    sender: string;
    sender_email: string;
    updated_at: string;
    gift_hex_color: string;
    transaction_fee: number;
    card_fee: number;
}


export interface PaymentMethod {
    stripe_token_id: string;
    brand: string;
    country: string;
    cvc_check: any;
    exp_month: number;
    exp_year: number;
    funding: string;
    last4: string;
}


export const giftAppInitialState: {
    contactList: Contact[],
    contactInfo: Contact,
    importedContactInfo: [],
    favoriteList: Contact[],
    dashboardInfo: DashboardInfo,
    transactionDetail: TransactionDetail,
    paymentMethodList: PaymentMethod[],
    eventList: Event[],
    eventAllList: Event[],
    eventInvitedList: Event[],
    thankyouList: Thankyou[],
    latestEvent: any,
    latestThankyou: Thankyou,
    giftCategoryList: GiftCatetory[],
    giftReceivedList: GiftReceived[],
    transactionList: Transaction[],
    giftColorList: GiftColor[],
    giftFontList: GiftFont[],
    cardTypeList: CardType[],
    giftPictureList: GiftPicture[],
    customPictureList: CustomPicture[],
    eventTypeList: EventType[],
    currencyTypeList: CurrencyType[],
    giftInfo: GiftInfo,
    membersInfo: [],
    thankyouMembersInfo: [],
    eventMembers: [],
    eventInfo: Event,
    thanksNoteInfo: any,
    myProfile: MyProfile,
    stripeAccountLinkInfo: any,
    isAddEventSuccess: boolean,
    isAddEventTriggered: boolean,
    isUpdateEventSuccess: boolean,
    isAddMemberSuccess: boolean,
    isSetMemberSuccess: boolean,
    isUpdateEventTriggered: boolean,
    isPayThankyouSuccess: boolean,
    isAddThankyouSuccess: boolean,
    isAddThankyouSuccess1: boolean,
    isAddThankyouTriggered: boolean,
    isUpdateThankyouSuccess: boolean,
    isAddThankyouMemberSuccess: boolean,
    isSetThankyouMemberSuccess: boolean,
    isUpdateThankyouTriggered: boolean,
    dateInfo: string,
    eventDetailInfo: EventDetailInfo
    paymentToken: string,
    paymentTokenBank: string,
    isPaymentTokenGeneratedSuccess: boolean,
    isPaymentTokenBankGeneratedSuccess: boolean,
    isAddingPaymentMethodSuccess: boolean,
    isTransactionSendSuccess: boolean,
    isContactUsSuccess: boolean,
    isTransactionSendFailed: boolean,
    isTransactionSendTriggered: boolean,
    isDeletePaymentMethodSuccess: boolean,
    isDeleteContactSuccess: boolean,
    isPaymentMethodLoading: boolean,
    isDashBoardInfoLoading: boolean,
    newGiftId: number,
    newGift: any,
    selectedPaymentMethod: PaymentMethod,
    isAddContactSuccess: boolean,
    isImportContactsSuccess: boolean,
    isUpdateContactSuccess: boolean,
    isAddGiftSuccess: boolean,
    isVerifyBankAccountSuccess: boolean,
    stripeTokenId: string,
    transactionDetailSuccess: boolean,
    paymentMethod: any
} = {
    contactList: [],
    contactInfo: {
        id: 0,
        name: "",
        email: "",
        first_name: "",
        last_name: "",
        phone: "",
        owner_id: 0,
        created_at: "",
        updated_at: "",
        is_favourite: false
    },
    importedContactInfo: [],
    favoriteList: [],
    dashboardInfo: {
        total_received: 0,
        upcoming_events: [],
        latest_gifts: []
    },
    transactionDetail: {
        colleague_name: '',
        colleague_email: '',
        flagged_total_amount: 0,
        id: 0,
        receiver: '',
        receiver_email: '',
        event: null,
        gift_category: '',
        gift_picture: '',
        gift_color: '',
        gift_primary_font: '',
        gift_secondary_font: '',
        gift_status: '',
        gift_pictures_id: 0,
        gift_colors_id: 0,
        gift_primary_fonts_id: 0,
        gift_secondary_fonts_id: 0,
        gift_status_id: 0,
        amount: 0,
        message: '',
        application_fee_amount: 0,
        total_amount: 0,
        sender: '',
        sender_email: '',
        updated_at: '',
        gift_hex_color: '',
        transaction_fee: 0,
        card_fee: 0
    },
    paymentMethodList: [],
    eventList: [],
    eventAllList: [],
    eventInvitedList: [],
    thankyouList: [],
    latestEvent: null,
    latestThankyou: {
        id: 0,
        events_id: 0,
        event: '',
        payment_completed: false,
        sent: false,
        message: '',
        amount: 0,
        fee_amount: 0,
        total_amount: 0,
        contacts: []
    },
    giftCategoryList: [],
    giftColorList: [],
    giftFontList: [],
    cardTypeList: [],
    giftPictureList: [],
    customPictureList: [],
    eventTypeList: [],
    currencyTypeList: [],
    giftReceivedList: [],
    transactionList: [],
    giftInfo: {
        card_type_id: 2,
        gift_category: {
            id: 1,
            description: '',
            image_relative_url: '',
            image_url: '',
            bg_color: ''
        },
        gift_picture: {
            id: 1,
            gift_categories_id: 1,
            description: '',
            image_relative_url: '',
            image_url: '',
            is_custom: true,
        },
        gift_color: {
            id: 1,
            description: '',
            hex_color: ''
        },
        gift_primary_font: {
            id: 1,
            description: ''
        },
        amount: 0,
        gift_contact: {
            id: 1,
            name: '',
            email: '',
            first_name: '',
            last_name: '',
            phone: '',
            owner_id: 1,
            created_at: '',
            updated_at: '',
            is_favourite: false
        },
        gift_secondary_font: {
                id: 1,
                description: ''
        },
        message: ''
    },
    membersInfo: [],
    thankyouMembersInfo: [],
    eventMembers: [],
    myProfile: {
        id: 1,
        name: '',
        email: '',
        first_name: '',
        last_name: '',
        image_url: 'https://givegiftd.s3.us-east-1.amazonaws.com/default/profile_picture.png',
        phone: '',
        date_of_birth: '',
        role_id: 3,
        preferred_timezone_tzab: 'EDT',
        account_status_id: 2,
        default_currency_id: 144,
        role: 'Public User',
        currency_type: 'USD',
        user_stripe_account: 'pending verification'
    },
    stripeAccountLinkInfo: null,
    isAddEventSuccess: false,
    isAddEventTriggered: false,
    isUpdateEventSuccess: false,
    isAddMemberSuccess: false,
    isSetMemberSuccess: false,
    isUpdateEventTriggered: false,
    isPayThankyouSuccess: false,
    isAddThankyouSuccess: false,
    isAddThankyouSuccess1: false,
    isAddThankyouTriggered: false,
    isUpdateThankyouSuccess: false,
    isAddThankyouMemberSuccess: false,
    isSetThankyouMemberSuccess: false,
    isUpdateThankyouTriggered: false,
    dateInfo: '',
    eventDetailInfo: {
        id: 1,
        name: "",
        event_date: "",
        message: "",
        archived: false,
        event_type_id: 1,
        event_type: "",
        image_url: "",
        qr_code_url: "",
        events_members: []
    },
    eventInfo: {
        id: 1,
        name: "",
        event_date: "2022-01-01",
        message: "",
        archived: false,
        owner_id: 47,
        event_type_id: 1,
        created_at: "",
        updated_at: "",
        image_relative_url: "",
        events_members_count: 0,
        events_members: [],
        image_url: "",
        event_type: null
    },
    thanksNoteInfo: null,
    paymentToken: '',
    paymentTokenBank: '',
    isPaymentTokenGeneratedSuccess: false,
    isPaymentTokenBankGeneratedSuccess: false,
    isAddingPaymentMethodSuccess: false,
    isTransactionSendSuccess: false,
    isContactUsSuccess: false,
    isTransactionSendFailed: false,
    isTransactionSendTriggered: false,
    isDeletePaymentMethodSuccess: false,
    isDeleteContactSuccess: false,
    isPaymentMethodLoading: false,
    isDashBoardInfoLoading: false,
    selectedPaymentMethod: {
        stripe_token_id: '',
        brand: '',
        country: 'US',
        cvc_check: 'pass',
        exp_month: 2022,
        exp_year: 12,
        funding: '',
        last4: ''
    },
    newGiftId: 0,
    newGift: null,
    isAddContactSuccess: false,
    isImportContactsSuccess: false,
    isUpdateContactSuccess: false,
    isAddGiftSuccess: false,
    isVerifyBankAccountSuccess: false,
    stripeTokenId: '',
    transactionDetailSuccess: false,
    paymentMethod: null
};


export function giftAppReducer(state = giftAppInitialState, action: any) {

    switch (action.type) {

        case GET_MY_PROFILE_SUCCESS:
            return {
                ...state,
                myProfile: action.myProfile as MyProfile
            };

        case GET_STRIPE_DASHBOARD_SUCCESS:
            return {
                ...state,
                stripeAccountLinkInfo: action.stripeAccountLinkInfo
            };

        case GET_PAYMENT_METHODS_SUCCESS:
            return {
                ...state,
                paymentMethodList: action.paymentMethodList as PaymentMethod,
                isPaymentMethodLoading: false,
            };

        case GET_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                contactList: action.contactList as Contact[]
            };

        case GET_FAVORITE_CONTACT_LIST_SUCCESS:
            return {
                ...state,
                favoriteList: action.favoriteList as Contact[]
            };

        case GET_DASHBOARD_INFO_SUCCESS:
            return {
                ...state,
                isDashBoardInfoLoading: false,
                dashboardInfo: action.dashboardInfo as DashboardInfo
            };

        case GET_EVENT_LIST_SUCCESS:
            return {
                ...state,
                eventList: action.eventList as Event[]
            };

        case GET_ALL_EVENT_LIST_SUCCESS:
            return {
                ...state,
                eventAllList: action.eventAllList as Event[]
            };

        case GET_INVITED_EVENT_LIST_SUCCESS:
            return {
                ...state,
                eventInvitedList: action.eventInvitedList as Event[]
            };

        case GET_GIFT_CATEGORIES_SUCCESS:
            return {
                ...state,
                giftCategoryList: action.giftCategoryList as GiftCatetory[]
            };

        case GET_GIFTS_RECEIVED_SUCCESS:
            return {
                ...state,
                giftReceivedList: action.giftReceivedList as GiftReceived[]
            };

        case GET_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                transactionList: action.transactionList as Transaction[],
                transactionDetailSuccess: false
            };

        case GET_EVENT_DETAIL_SUCCESS:
            return {
                ...state,
                eventDetailInfo: action.eventDetailInfo as EventDetailInfo
            };

        case GET_GIFT_COLORS_SUCCESS:
            return {
                ...state,
                giftColorList: action.giftColorList as GiftColor[]
            };

        case GET_EVENT_TYPES_SUCCESS:
            return {
                ...state,
                eventTypeList: action.eventTypeList as EventType[]
            };

        case GET_CURRENCY_TYPES_SUCCESS:
            return {
                ...state,
                currencyTypeList: action.currencyTypeList as CurrencyType[]
            };

        case GET_GIFT_FONTS_SUCCESS:
            return {
                ...state,
                giftFontList: action.giftFontList as GiftFont[]
            };

        case GET_CARD_TYPES_SUCCESS:
            return {
                ...state,
                cardTypeList: action.cardTypeList as CardType[]
            };

        case GET_GIFT_PICTURES_SUCCESS:
            return {
                ...state,
                giftPictureList: action.giftPictureList as GiftPicture[]
            };

        case GET_CUSTOM_PICTURES_SUCCESS:
            return {
                ...state,
                customPictureList: action.customPictureList as CustomPicture[]
            };

        case GET_TRANSACTION_DETAIL_SUCCESS:
            return {
                ...state,
                transactionDetailSuccess: true,
                transactionDetail: action.transactionDetail as TransactionDetail
            };

        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                isAddContactSuccess: true,
                contactList: [...state.contactList, action.contact]
            };

        case IMPORT_CONTACTS_SUCCESS:
            return {
                ...state,
                isImportContactsSuccess: true,
                // contactList: action.contactList
            };

        case UPDATE_CONTACT_SUCCESS:
            return {
                ...state,
                isUpdateContactSuccess: true,
                contactList: [...(state.contactList.filter(contact => contact.id !== action.contact.id)), action.contact]
            };

        case GENERATE_TOKEN_SUCCESS:
            return {
                ...state,
                isPaymentTokenGeneratedSuccess: true,
                paymentToken: action.data.payment_token
            };

        case GENERATE_TOKEN_BANK_SUCCESS:
            return {
                ...state,
                isPaymentTokenBankGeneratedSuccess: true,
                paymentTokenBank: action.data.payment_token
            };

        case ADD_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                isAddingPaymentMethodSuccess: true,
                isPaymentTokenGeneratedSuccess: false,
                isDeletePaymentMethodSuccess: false,  
                isVerifyBankAccountSuccess: false,
                stripeTokenId: action.data.stripe_token_id,
                paymentToken: '',
                paymentMethodList: [
                    ...state.paymentMethodList,
                    action.data                    
                ],
                selectedPaymentMethod: action.data
            };

        case VERIFY_BANK_ACCOUNT_SUCCESS:
            return {
                ...state,
                isVerifyBankAccountSuccess: true,
            };

        case TRANSACTION_SEND_SUCCESS:
            return {
                ...state,
                isTransactionSendSuccess: true,
                isTransactionSendFailed: false,
                isTransactionSendTriggered: true,
            };

        case CONTACT_US_SUCCESS:
            return {
                ...state,
                isContactUsSuccess: true,
            };

        case TRANSACTION_SEND_FAILED:
            return {
                ...state,
                isTransactionSendFailed: true,
                isTransactionSendSuccess: false,
                isTransactionSendTriggered: true,
            };

        case DELETE_PAYMENT_METHOD_SUCCESS:
            return {
                ...state,
                paymentMethodList: state.paymentMethodList.filter((paymentmethod) => paymentmethod.stripe_token_id != action.stripe_id),
                isDeletePaymentMethodSuccess: true,                
            };

        case DELETE_CONTACT_SUCCESS:
            return {
                ...state,
                contactList: state.contactList.filter((contact) => contact.id != action.contact_id),
                isDeleteContactSuccess: true,                
            };
    

        case ADD_GIFT_SUCCESS:
            return {
                ...state,
                isAddGiftSuccess: true,
                newGiftId: action.giftInfo.id,
                newGift: action.giftInfo
            };

        case ADD_EVENT_SUCCESS:
            return {
                ...state,
                isAddEventSuccess: true,
                isAddEventTriggered: true,
                latestEvent: action.event,
                eventList: [
                    ...state.eventList,
                    action.event
                ]
            };

        case ADD_THANK_YOU_SUCCESS:
            return {
                ...state,
                isAddThankyouSuccess: true,
                isAddThankyouTriggered: true,
                latestThankyou: action.thankyouDetail,
                thankyouList: [
                    ...state.thankyouList,
                    action.thankyouDetail
                ]
            };

        case ADD_THANK_YOU_SUCCESS_1:
            return {
                ...state,
                isAddThankyouSuccess1: true,
                isAddThankyouTriggered1: true,
                latestThankyou: action.thankyouDetail,
                thankyouList: [
                    ...state.thankyouList,
                    action.thankyouDetail
                ]
            };

        case UPDATE_THANK_YOU_SUCCESS:
            return {
                ...state,
                isUpdateThankyouSuccess: true,
                isUpdateThankyouTriggered: true,
                latestThankyou: action.thankyouDetail,
            };

        case SET_MEMBERS_THANK_YOU_SUCCESS:
            return {
                ...state,
                isSetThankyouMemberSuccess: true,
                isSetMembersThankyouTriggered: true,
                latestThankyou: action.thankyouDetail,
            };

        case PAY_THANK_YOU_SUCCESS:
            return {
                ...state,
                isPayThankyouSuccess: true,
            };

        case PAY_THANK_YOU_FAILED:
            return {
                ...state,
                isPayThankyouSuccess: false,
            };

        case UPDATE_EVENT_SUCCESS:
            return {
                ...state,
                isUpdateEventSuccess: true,
                isUpdateEventTriggered: true,
                eventDetailInfo: action.event
            };

        case ADD_MEMBER_SUCCESS:
            return {
                ...state,
                isAddMemberSuccess: true,
                eventMembers: action.eventMembers
            };

        case SET_MEMBER_SUCCESS:
            return {
                ...state,
                isSetMemberSuccess: true,
                eventMembers: action.eventMembers
            };

        case GET_MEMBER_SUCCESS:
            return {
                ...state,
                eventMembers: action.eventMembers
            };

        case DELETE_MEMBER_SUCCESS:
            return {
                ...state,
                isDeleteMemberSuccess: true,
            };

        case SET_GIFT_INFO:
            return {
                ...state,
                giftInfo: {
                ...state.giftInfo,
                ...action.giftInfo
                }
            }

        case SET_STRIPE_TOKEN_ID:
            return {
                ...state,
                stripeTokenId: action.stripeTokenId
            }

        case SET_CONTACT_INFO:
            return {
                ...state,
                contactInfo: action.contactInfo
            }

        case SET_IMPORTED_CONTACT_INFO:
            return {
                ...state,
                importedContactInfo: action.importedContactInfo
            }

        case SET_MEMBERS_INFO:
            return {
                ...state,
                membersInfo: action.membersInfo,
            }

        case SET_THANK_YOU_MEMBERS_INFO:
            return {
                ...state,
                thankyouMembersInfo: action.thankyouMembersInfo,
            }

        case SET_EVENT_MEMBERS_INFO:
            return {
                ...state,
                eventMembers: action.eventMembers,
            }

        case SET_DATE_INFO:
            return {
                ...state,
                dateInfo: action.dateInfo,
            }

        case SET_EVENT_INFO:
            return {
                ...state,
                eventInfo: action.eventInfo
            }
        case SET_THANKS_NOTE_INFO:
            return {
                ...state,
                thanksNoteInfo: action.thanksNoteInfo
            }
        case SET_EVENT_DETAIL_INFO:
            return {
                ...state,
                eventDetailInfo: action.eventDetailInfo
            }
        case SET_SELECTED_PAYMENT_METHOD:
            return {
                ...state,
                selectedPaymentMethod: action.paymentMethod
            }
        case CLEAR_PAYMENT_METHOD_STATE:
            return {
                ...state,
                isAddingPaymentMethodSuccess: false,
                isPaymentTokenGeneratedSuccess: false,
                isPaymentTokenBankGeneratedSuccess: false,
                isDeletePaymentMethodSuccess: false, 
            }
        case CLEAR_CONTACT_US_STATE:
            return {
                ...state,
                isContactUsSuccess: false,
            }
        case CLEAR_TRANSACTION_STATE:
            return {
                ...state,
                isTransactionSendSuccess: false, 
                isTransactionSendFailed: false,   
                isTransactionSendTriggered: false
            }
        case CLEAR_THANKS_STATE:
            return {
                ...state,
                isAddThankyouSuccess: false, 
                isAddThankyouSuccess1: false, 
            }
        case CLEAR_CONTACT_STATE:
            return {
                ...state,
                isAddContactSuccess: false,
                isImportContactsSuccess: false,
                isDeleteContactSuccess: false,
                contactInfo: ''
            }
        case CLEAR_TRANSACTION_DETAIL_SUCCESS:
            return {
                ...state,
                transactionDetailSuccess: false,
            }
        case CLEAR_DELETE_CONTACT_STATE:
            return {
                ...state,
                isDeleteContactSuccess: false,        
            }
        case CLEAR_STRIPE_DASHBOARD_INFO:
            return {
                ...state,
                stripeAccountLinkInfo: null,
            }
        case CLEAR_THANKS_NOTE_STATE:
            return {
                ...state,
                isAddThankyouSuccess1: false,
                isPayThankyouSuccess: false,
                isAddThankyouSuccess: false,
                isAddThankyouTriggered: false,
                isUpdateThankyouSuccess: false,
                isAddThankyouMemberSuccess: false,
                isSetThankyouMemberSuccess: false,
                isUpdateThankyouTriggered: false,
            }
        case CLEAR_EVENT_STATE:
            return {
                ...state,
                isAddEventSuccess: false,
                isAddEventTriggered: false,
                isUpdateEventSuccess: false,
                isAddMemberSuccess: false,
                isSetMemberSuccess: false,
                isDeleteMemberSuccess: false,
                membersInfo: [],
                thankyouMembersInfo: [],
            }
        case EVENT_LOADING:
            return {
                ...state,
                isAddEventSuccess: false,
                isAddEventTriggered: false,
                isUpdateEventSuccess: false,
                isAddMemberSuccess: false,
                isSetMemberSuccess: false,
                isDeleteMemberSuccess: false
            }
        case EVENT_FAILED:
            return {
                ...state,
                isAddEventSuccess: false,
                isAddEventTriggered: true,
                isUpdateEventSuccess: false,
                isAddMemberSuccess: false,
                isSetMemberSuccess: false,
                isDeleteMemberSuccess: false
            }
        case THANK_YOU_LOADING:
            return {
                ...state,
                isAddThankyouSuccess: false,
                isUpdateThankyouSuccess: false,
                isAddThankyouTriggered: true,
                isAddThankyouMemberSuccess: false,
                isSetThankyouMemberSuccess: false,
                isDeleteThankyouMemberSuccess: false
            }
        case THANK_YOU_FAILED:
            return {
                ...state,
                isAddThankyouSuccess: false,
                isUpdateThankyouSuccess: false,
                isAddThankyouTriggered: false,
                isAddThankyouMemberSuccess: false,
                isSetThankyouMemberSuccess: false,
                isDeleteThankyouMemberSuccess: false
            }
        case SET_PAYMENT_METHOD_LOADING:
            return {
                ...state,
                isPaymentMethodLoading: true,
            }
        case SET_DASHBOARD_INFO_LOADING:
            return {
                ...state,
                isDashBoardInfoLoading: true,
            }
        default:
            return state;
    }
}
