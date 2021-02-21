// Expects e to be an enum
export function getEnumValues(e: any): string[] {
    return Object.values(e);
}

export function getEnumReverseMap(EnumType: any): Map<string, any> {
    // @ts-ignore
    let reverseMap = new Map<string, EnumType>();
    Object.keys(EnumType).forEach((enumMember) => {
        let enumValue: string = EnumType[enumMember];
        reverseMap.set(enumValue, enumMember);
    })
    return reverseMap;
}

export enum YesNo {
    YES = "Yes",
    NO = "No",
}

export let YesNoReverseMap: Map<string, YesNo> = getEnumReverseMap(YesNo);

export function booleanToYesNo(boolean: boolean): YesNo {
    if (boolean) {
        return YesNo.YES;
    } else {
        return YesNo.NO;
    }
}

export function yesNoToBoolean(yesNo: YesNo): boolean {
    // @ts-ignore
    if (YesNo[yesNo] === YesNo.YES) {
        return true;
        // @ts-ignore
    } else if (YesNo[yesNo] === YesNo.NO) {
        return false;
    } else {
        console.warn("Could not determine if selected answer was Yes or No");
        return false;
    }
}