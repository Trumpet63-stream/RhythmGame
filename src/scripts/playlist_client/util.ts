
export function getContentsByTagName(xml: Element | Document, tag: string) {
    return xml.getElementsByTagName(tag)[0].innerHTML;
}
