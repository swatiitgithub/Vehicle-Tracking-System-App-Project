import moment from "moment";


export function getTodayDate(){
    return moment().format('YYYY-MM-DD')
}
export function getTodayDateTime(){
    return moment().format('YYYY-MM-DDThh:mm:ss')
}

export const convertDate = (inputDateString: any) => {
    // Parse the input date string using Moment.js
    const parsedDate = moment(inputDateString, 'YYYY-MM-DD HH:mm:ss');
    // Format the parsed date in the desired format
    const formattedDate = parsedDate.format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    return formattedDate
}