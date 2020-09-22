import * as p5 from "p5";
import {DOMWrapper} from "./dom_wrapper";
import {global} from "./index";
import {setElementClasses} from "./ui_util";

export abstract class RadioTable {
    public static create(uniqueId: string, width: number, height: number, columnWidths: number[], headers: string[],
                         contents: string[][]): { element: p5.Element, alreadyExists: boolean } {
        let p: p5 = global.p5Scene.sketchInstance;
        let radioName: string = uniqueId + "-radio";
        let divCreateResult = DOMWrapper.create(() => {
            return p.createElement("div");
        }, uniqueId);
        let div = divCreateResult.element;
        if (!divCreateResult.alreadyExists) {
            setElementClasses(div, global.globalClass, "menu-table");

            let table: HTMLTableElement = p.createElement("table").elt;
            table.style.width = width + "px";
            table.style.height = height + "px";

            this.addColumnGroup(table, columnWidths);
            this.addHeaderRow(table, [""].concat(headers));

            let tableBody: HTMLTableSectionElement = table.createTBody();
            for (let i = 0; i < contents.length; i++) {
                this.createRowWithRadio(tableBody, contents[i], radioName, i);
            }

            divCreateResult.element.elt.appendChild(table);
        }
        divCreateResult.element.value = RadioTable.getRadioValue.bind(this, radioName);
        return divCreateResult;
    }

    private static addColumnGroup(table: HTMLTableElement, columnWidths: number[]) {
        this.scaleNumbersToAddUpTo(columnWidths, 96);
        let colgroup: HTMLTableColElement = document.createElement("colgroup");
        this.addColumn(colgroup, 4);
        for (let i = 0; i < columnWidths.length; i++) {
            this.addColumn(colgroup, columnWidths[i]);
        }
        table.appendChild(colgroup)
    }

    private static addColumn(columnGroup: HTMLTableColElement, widthPercent: number) {
        let column: HTMLTableColElement = document.createElement("col");
        column.span = 1;
        column.style.width = widthPercent + "%";
        columnGroup.appendChild(column);
    }

    private static scaleNumbersToAddUpTo(numbers: number[], targetSum: number) {
        let sum: number = 0;
        for (let i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        for (let i = 0; i < numbers.length; i++) {
            numbers[i] *= targetSum / sum;
        }
    }

    private static getRadioValue(radioName: string): string | number {
        let radioOptions: NodeListOf<HTMLElement> = document.getElementsByName(radioName);
        for (let i = 0; i < radioOptions.length; i++) {
            let radioOption: HTMLInputElement = <HTMLInputElement>radioOptions[i];
            if (radioOption.checked) {
                return radioOption.id;
            }
        }
        return "";
    }

    private static createRowWithRadio(tableSection: HTMLTableSectionElement, contents: string[],
                                      radioName: string, radioId: number) {
        let newRow: HTMLTableRowElement = tableSection.insertRow();
        RadioTable.addRadioCellToRow(newRow, radioName, radioId);

        for (let i = 0; i < contents.length; i++) {
            let newCell: HTMLTableCellElement = newRow.insertCell();
            newCell.innerText = contents[i];
        }
    }

    private static addRadioCellToRow(row: HTMLTableRowElement, radioName: string, radioId: number) {
        let radioCell: HTMLTableCellElement = row.insertCell();
        let radioOption: HTMLInputElement = RadioTable.createRadioInput(radioName, radioId);
        radioCell.appendChild(radioOption);

        row.onclick = (e: MouseEvent) => {
            let parent: HTMLElement = (<HTMLElement>e.target).parentElement;
            if (parent.tagName === "TR") {
                let innerInput: HTMLInputElement = parent.getElementsByTagName("input")[0];
                innerInput.checked = true;
            }
        };
    }

    private static createRadioInput(radioName: string, id: number) {
        let radioOption: HTMLInputElement = document.createElement("input");
        radioOption.type = "radio"
        radioOption.value = "";
        radioOption.name = radioName;
        radioOption.id = String(id);
        return radioOption
    }

    private static addHeaderRow(table: HTMLTableElement, contents: string[]) {
        let tableHeader: HTMLTableSectionElement = table.createTHead();
        let newRow: HTMLTableRowElement = tableHeader.insertRow();
        for (let i = 0; i < contents.length; i++) {
            let newCell: HTMLTableCellElement = document.createElement("th");
            newCell.innerText = contents[i];
            newRow.appendChild(newCell);
        }
    }
}