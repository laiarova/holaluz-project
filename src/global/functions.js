export function getInfoCups (arrayToSearchCups, itemCups){
    return arrayToSearchCups.find((element) => element.cups === itemCups);
}