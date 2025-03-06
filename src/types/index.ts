
export type LIST_OBJECT = {
    appCompID: string,
    appCompName: string,
    noOfReviews: string,
    overAllRating: string,
    commonName: string,
    galleryImage: string,
    timing: string,
    website: string,
}
export type REVIEW_OBJECT = {

    appCompID: string,
    ratingID: string,
    rating: string,
    compName: string,
    reviewText: string,
    mobileNo: string,
    mac: string,
    entryDate: string,
    userID: string,
    formID: string,
    type: string
}

export type DETAIL_OBJECT = {
    aboutUs: string,
    appCompName: string,
    areaName: string,
    closingDay: string,
    closingTime: string,
    compAddress: string,
    contact1: string,
    contact2: string,
    districtName: string,
    faceBook: string,
    instagram: string,
    landMark: string,
    lstAppCompFacilityRespDTO: [],
    lstAppCompImageRespDTO: [],
    noOfReviews: string,
    onlineReservationDetail: string,
    openingTime: string,
    overAllRating: string,
    pinCode: string,
    ratingCnt1: string,
    ratingCnt2: string,
    ratingCnt3: string,
    ratingCnt4: string,
    ratingCnt5: string,
    stateName: string,
    tollFreeNo: string,
    twitter: string,
    website: string,
    whatsApp: string
}


export type LIST_BG = {
    bg: any,
    bgImage: boolean
}