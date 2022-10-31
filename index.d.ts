/**
 *  node-steam-tradeoffer-manager typings : https://github.com/DoctorMcKay/node-steam-tradeoffer-manager
 */

/**
 * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/wiki/TradeOfferManager
 */
declare class TradeOfferManager {
  pollInterval: number;
  cancelTime: number;
  pendingCancelTime: number;
  cancelOfferCount: number;
  cancelOfferCountMinAge: number;
  pollData: any;
  apiKey: string;
  steamID: SteamID;

  constructor(options: TradeOfferManager.Options);

  on(event: "newOffer", callback: (offer: TradeOfferManager.TradeOffer) => any);
  on(event: "sentOfferChanged", callback: (offer: TradeOfferManager.TradeOffer, oldState: TradeOfferManager.ETradeOfferState) => any);
  on(event: "sentOfferCanceled", callback: (offer: TradeOfferManager.TradeOffer, reason: string) => any);
  on(event: "sentPendingOfferCanceled", callback: (offer: TradeOfferManager.TradeOffer) => any);
  on(event: "unknownOfferSent", callback: (offer: TradeOfferManager.TradeOffer) => any);
  on(event: "receivedOfferChanged", callback: (offer: TradeOfferManager.TradeOffer, oldState: TradeOfferManager.ETradeOfferState) => any);
  on(event: "pollFailure", callback: (err: Error) => any);
  on(event: "pollSuccess", callback: () => any);
  on(event: "pollData", callback: (pollData: any) => any);

  on(event: string, callback: any);

  setCookies(cookies: any);
  setCookies(cookies: any, callback: (err: Error) => any);

  shutdown();

  parentalUnlock(pin: string);
  parentalUnlock(pin: string, callback: (err: Error) => any);

  createOffer(tradeUrl: string): TradeOfferManager.TradeOffer;
  createOffer(partner: SteamID, token: string): TradeOfferManager.TradeOffer;
  createOffer(partner: string, token: string): TradeOfferManager.TradeOffer;
  createOffer(partner: SteamID): TradeOfferManager.TradeOffer;
  createOffer(partner: string): TradeOfferManager.TradeOffer;

  getOffer(id: string, callback: (err: Error, offer: TradeOfferManager.TradeOffer) => any);

  getOffers(
    filter: TradeOfferManager.EOfferFilter,
    callback: (err: Error, sent: TradeOfferManager.TradeOffer[], received: TradeOfferManager.TradeOffer[]) => any
  );

  getOffers(
    filter: TradeOfferManager.EOfferFilter,
    historicalCutoff: Date,
    callback: (err: Error, sent: TradeOfferManager.TradeOffer[], received: TradeOfferManager.TradeOffer[]) => any
  );

  getInventoryContents(
    appid: string,
    contextid: string,
    tradableOnly: boolean,
    callback: (err: Error, inventory: TradeOfferManager.EconItem[], currencies: TradeOfferManager.EconItem[]) => any
  );

  getUserInventoryContents(
    sid: SteamID | string,
    appid: string,
    contextid: string,
    tradableOnly: boolean,
    callback: (err: Error, inventory: TradeOfferManager.EconItem[], currencies: TradeOfferManager.EconItem[]) => any
  );

  loadInventory(
    appid: string,
    contextid: string,
    tradableOnly: boolean,
    callback: (err: Error, inventory: TradeOfferManager.EconItem[], currencies: TradeOfferManager.EconItem[]) => any
  );

  loadUserInventory(
    userId: SteamID | string,
    appid: string,
    contextid: string,
    tradableOnly: boolean,
    callback: (err: Error, inventory: TradeOfferManager.EconItem[], currencies: TradeOfferManager.EconItem[]) => any
  );

  getOfferToken(callback: (err: Error, token: string) => any);

  getEscrowDuration(steamID: SteamID | string, callback: (err: Error, daysTheirEscrow: number, daysMyEscrow: number) => any);

  getEscrowDuration(steamID: SteamID | string, token: string, callback: (err: Error, daysTheirEscrow: number, daysMyEscrow: number) => any);

  getOffersContainingItems(
    items: TradeOfferManager.EconItem[],
    includeInactive: boolean,
    callback: (err: Error, sent: TradeOfferManager.TradeOffer[], received: TradeOfferManager.TradeOffer[]) => any
  );

  doPoll();
  doPoll(doFullUpdate: boolean);
}

declare namespace TradeOfferManager {
  /**
   * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/lib/classes/EconItem.js
   */
  class EconItem {
    id: string;
    assetid: string;
    contextid: string;
    appid: string;
    classid: string;
    instanceid: string;
    amount: number;
    pos: number;
    name: string;
    market_hash_name: string;
    name_color: string;
    background_color: string;
    type: string;
    tradable: boolean;
    marketable: boolean;
    commodity: boolean;
    market_tradable_restriction: number;
    descriptions: any;
    fraudwarnings: string[];
    tags: any;
    app_data: any;

    getImageURL(): string;
    getLargeImageURL(): string;
    getTag(category: string): any;
  }

  /**
   * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/resources/ETradeOfferState.js
   */
  enum ETradeOfferState {
    Invalid = 1,
    Active = 2,
    Accepted = 3,
    Countered = 4,
    Expired = 5,
    Canceled = 6,
    Declined = 7,
    InvalidItems = 8,
    CreatedNeedsConfirmation = 9,
    CanceledBySecondFactor = 10,
    InEscrow = 11,
  }

  /**
   * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/resources/EConfirmationMethod.js
   */
  enum EConfirmationMethod {
    ActiveOnly = 1,
    HistoricalOnly = 2,
    All = 3,
  }

  /**
   * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/resources/EResult.js
   */
  enum EResult {
    Invalid = 0,
    OK = 1,
    Fail = 2,
    NoConnection = 3,
    InvalidPassword = 5,
    LoggedInElsewhere = 6,
    InvalidProtocolVer = 7,
    InvalidParam = 8,
    FileNotFound = 9,
    Busy = 10,
    InvalidState = 11,
    InvalidName = 12,
    InvalidEmail = 13,
    DuplicateName = 14,
    AccessDenied = 15,
    Timeout = 16,
    Banned = 17,
    AccountNotFound = 18,
    InvalidSteamID = 19,
    ServiceUnavailable = 20,
    NotLoggedOn = 21,
    Pending = 22,
    EncryptionFailure = 23,
    InsufficientPrivilege = 24,
    LimitExceeded = 25,
    Revoked = 26,
    Expired = 27,
    AlreadyRedeemed = 28,
    DuplicateRequest = 29,
    AlreadyOwned = 30,
    IPNotFound = 31,
    PersistFailed = 32,
    LockingFailed = 33,
    LogonSessionReplaced = 34,
    ConnectFailed = 35,
    HandshakeFailed = 36,
    IOFailure = 37,
    RemoteDisconnect = 38,
    ShoppingCartNotFound = 39,
    Blocked = 40,
    Ignored = 41,
    NoMatch = 42,
    AccountDisabled = 43,
    ServiceReadOnly = 44,
    AccountNotFeatured = 45,
    AdministratorOK = 46,
    ContentVersion = 47,
    TryAnotherCM = 48,
    PasswordRequiredToKickSession = 49,
    AlreadyLoggedInElsewhere = 50,
    Suspended = 51,
    Cancelled = 52,
    DataCorruption = 53,
    DiskFull = 54,
    RemoteCallFailed = 55,
    PasswordUnset = 56,
    PasswordNotSet = 56, // obsolete - renamed to PasswordUnset
    ExternalAccountUnlinked = 57,
    PSNTicketInvalid = 58,
    ExternalAccountAlreadyLinked = 59,
    RemoteFileConflict = 60,
    IllegalPassword = 61,
    SameAsPreviousValue = 62,
    AccountLogonDenied = 63,
    CannotUseOldPassword = 64,
    InvalidLoginAuthCode = 65,
    AccountLogonDeniedNoMail = 66,
    AccountLogonDeniedNoMailSent = 66, // obsolete - renamed to AccountLogonDeniedNoMail
    HardwareNotCapableOfIPT = 67,
    IPTInitError = 68,
    ParentalControlRestricted = 69,
    FacebookQueryError = 70,
    ExpiredLoginAuthCode = 71,
    IPLoginRestrictionFailed = 72,
    AccountLockedDown = 73,
    AccountLocked = 73, // obsolete - renamed to AccountLockedDown
    AccountLogonDeniedVerifiedEmailRequired = 74,
    NoMatchingURL = 75,
    BadResponse = 76,
    RequirePasswordReEntry = 77,
    ValueOutOfRange = 78,
    UnexpectedError = 79,
    Disabled = 80,
    InvalidCEGSubmission = 81,
    RestrictedDevice = 82,
    RegionLocked = 83,
    RateLimitExceeded = 84,
    AccountLoginDeniedNeedTwoFactor = 85,
    AccountLogonDeniedNeedTwoFactorCode = 85, // obsolete - renamed to AccountLoginDeniedNeedTwoFactor
    ItemDeleted = 86,
    ItemOrEntryHasBeenDeleted = 86, // obsolete - renamed to ItemDeleted
    AccountLoginDeniedThrottle = 87,
    TwoFactorCodeMismatch = 88,
    TwoFactorActivationCodeMismatch = 89,
    AccountAssociatedToMultiplePartners = 90,
    AccountAssociatedToMultiplePlayers = 90, // obsolete - renamed to AccountAssociatedToMultiplePartners
    NotModified = 91,
    NoMobileDeviceAvailable = 92,
    TimeIsOutOfSync = 93,
    SMSCodeFailed = 94,
    AccountLimitExceeded = 95,
    TooManyAccountsAccessThisResource = 95, // obsolete - renamed to AccountLimitExceeded
    AccountActivityLimitExceeded = 96,
    PhoneActivityLimitExceeded = 97,
    RefundToWallet = 98,
    EmailSendFailure = 99,
    NotSettled = 100,
    NeedCaptcha = 101,
    GSLTDenied = 102,
    GSOwnerDenied = 103,
    InvalidItemType = 104,
    IPBanned = 105,
  }

  /**
   * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/wiki/TradeOffer
   */
  class TradeOffer {
    manager: TradeOfferManager;
    id: string;
    partner: string;
    message: string;
    state: ETradeOfferState;
    itemsToGive: EconItem[];
    itemsToReceive: EconItem[];
    isOurOffer: boolean;
    created: Date;
    updated: Date;
    expires: Date;
    tradeID: string;
    fromRealTimeTrade: boolean;
    confirmationMethod: EConfirmationMethod;
    escrowEnds: Date;
    rawJson: any;

    isGlitched(): boolean;

    data(key: string): any;
    data(key: string, value: any): any;

    loadPartnerInventory(appid: string, contextid: string, callback: (err: Error, inventory: EconItem[], currencies: EconItem[]) => void);
    getPartnerInventoryContents(appid: string, contextid: string, callback: (err: Error, inventory: EconItem[], currencies: EconItem[]) => void);

    addMyItem(item: EconItem);
    addMyItems(items: EconItem[]);

    removeMyItem(item: EconItem);
    removeMyItems(items: EconItem[]);

    addTheirItem(item: EconItem);
    addTheirItems(items: EconItem[]);

    removeTheirItem(item: EconItem);
    removeTheirItems(items: EconItem[]);

    containsItem(item: EconItem): boolean;

    send(callback: (err: Error, status: "pending" | "sent") => void);

    getUserDetails(callback: (err: Error, me: IDetails, them: IDetails) => void);

    cancel();
    cancel(callback: (err: Error) => void);

    decline();
    decline(callback: (err: Error) => void);

    accept();
    accept(autoRetry: boolean);
    accept(autoRetry: boolean, callback: (err: Error, status: "pending" | "accepted") => void);

    duplicate(): TradeOffer;
    counter(): TradeOffer;

    update(callback: (err: Error) => void);

    getReceivedItems(callback: (err: Error, items: EconItem[]) => void);
    getReceivedItems(getActions: boolean, callback: (err: Error, items: EconItem[]) => void);

    getExchangeDetails(
      getDetailsIfFailed: boolean,
      callback: (err: Error, status: ETradeOfferState, tradeInitTime: Date, receivedItems: EconItem[], sentItems: EconItem[]) => void
    );
    getExchangeDetails(callback: (err: Error, status: ETradeOfferState, tradeInitTime: Date, receivedItems: EconItem[], sentItems: EconItem[]) => void);

    setMessage(message: string);
    setToken(token: string);
  }

  /**
   * https://github.com/DoctorMcKay/node-steam-tradeoffer-manager/blob/master/resources/EOfferFilter.js
   */
  enum EOfferFilter {
    ActiveOnly = 1,
    HistoricalOnly = 2,
    All = 3,
  }

  interface Options {
    steam?: any;
    community?: SteamCommunity;
    domain?: string;
    language?: string;
    pollInterval?: number;
    cancelTime?: number;
    pendingCancelTime?: number;
    cancelOfferCount?: number;
    cancelOfferCountMinAge?: number;
    globalAssetCache?: boolean;
    pollData?: string;
  }

  interface IDetails {
    personaName: string;
    contexts: any;
    probation?: boolean;
    escrowDays: number;
    avatarIcon: string;
    avatarMedium: string;
    avatarFull: string;
  }
}

declare module "steam-tradeoffer-manager" {
  export = TradeOfferManager;
}
