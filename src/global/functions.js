export function getInfoCups (arrayToSearchCups, itemCups){
    const client = arrayToSearchCups.find((element) => element.cups === itemCups);
    return client ? client : null
}
