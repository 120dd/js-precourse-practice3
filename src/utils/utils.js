export function pickRandomNumInList(list) {
    return MissionUtils.Random.pickNumberInList(list);
}

export const $ = (selector) => document.querySelector(selector);

export function resetListValue(resetList) {
    resetList.forEach((resetTarget) => {
        resetTarget.value = ''
    });
}