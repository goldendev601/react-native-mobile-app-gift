import {
  KYC_INIT_STATUS,
  KYC_SET,
  KYC_ADD_REQUEST,
  KYC_ADD_SUCCESS,
  KYC_ADD_FAILURE,
} from '../actions/kycAction';

export const kycInitialState = {
  result: {
    category_of_investment: {
      checked: '',
      csd: '',
    },
    category_of_business: {
      checked: '',
      specification: '',
    },
    business_details: {
      companyName: '',
      incorporatorNum: '',
      commenceBusinessNum: '',
      dateIncorporation: '',
      licenseNum: '',
      jurisdictionIncor: '',
      parentCompanyIncor: '',
      natureBusiness: '',
      industry: '',
      principal: '',
      companyPostalAddress: '',
      digitalAddress: '',
      emailAddress: '',
      webSiteAddress: '',
      tin: '',
      contactNum1: '',
      contactNum2: '',
    },
    turnover: {
      monthChecked: '',
      annualChecked: '',
    },
    service_statement: {
      modeChecked: '',
      frequencyChecked: '',
    },
    client_investment_profile: {
      objective: '',
      toleranceChecked: '',
      horizonChecked: '',
      knowledgeChecked: '',
    },
    expected_account_activity: {
      fundChecked: '',
      specification: '',
      initialAmount: '',
      topActivityChecked: '',
      topAmount: '',
      withActivityChecked: '',
      withAmount: '',
    },
    key_contact_person: {
      surname: '',
      firstName: '',
      otherName: '',
      birthday: '',
      genderChecked: '',
      residentialChecked: '',
      permitNum: '',
      permitExpiryDate: '',
      placeIssue: '',
      permitIssueDate: '',
      idChecked: '',
      idNum: '',
      jobTitle: '',
      email: '',
      contactNum1: '',
      contactNum2: '',
    },
    account_signatory_details1: {
      surname: '',
      firstName: '',
      otherName: '',
      birthday: '',
      genderChecked: '',
      residentialChecked: '',
      permitNum: '',
      permitExpiryDate: '',
      placeIssue: '',
      permitIssueDate: '',
      idChecked: '',
      idNum: '',
      jobTitle: '',
      email: '',
      contactNum1: '',
      contactNum2: '',
    },
    directors_trustee_admin: { names: [], states: [] },
    benefical_ownership: {
      benefit: {
        surname: '',
        otherName: '',
        contactNum: '',
        homeAddress: '',
        idChecked: '',
        idNumber: '',
        status: '',
      },
      directors: {
        surname: '',
        otherName: '',
        contactNum: '',
        idChecked: '',
        idNumber: '',
        status: '',
      },
    },
    affiliations: '',
    bank_account_details: {
      bankName: '',
      accountName: '',
      accountNum: '',
      bankBranch: '',
    },
    email_telephone_fax_indemnity: {
      name: '',
      date: '',
      signature: null,
    },
  },
  isAdded: false,
  isAdding: false,
};

export function kycReducer(state = kycInitialState, action: any) {
  switch (action.type) {
    case KYC_INIT_STATUS:
      return {
        ...state,
        isAdded: false,
        isAdding: false,
      };

    case KYC_SET:
      return {
        ...state,
        result: action.result,
      };

    case KYC_ADD_REQUEST:
      return {
        ...state,
        isAdding: true,
        isAdded: false,
      };

    case KYC_ADD_SUCCESS:
      return {
        ...state,
        isAdding: false,
        isAdded: true,
        result: action.result,
      };

    case KYC_ADD_FAILURE:
      return {
        ...state,
        isAdded: false,
        isAdding: false,
      };

    default:
      return state;
  }
}
