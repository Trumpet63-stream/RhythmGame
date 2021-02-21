import * as p5 from "p5";
import {DOMWrapper} from "./dom_wrapper";
import {global} from "./index";
import {setElementClasses} from "./ui_util";

export abstract class MenuTable {
    public static create(uniqueId: string, width: number, height: number, columnWidths: number[],
                         contents: p5.Element[][]): { element: p5.Element, alreadyExists: boolean } {
        let p: p5 = global.p5Scene.sketchInstance;
        let divCreateResult = DOMWrapper.create(() => {
            return p.createElement("div");
        }, uniqueId);
        let div = divCreateResult.element;
        if (!divCreateResult.alreadyExists) {
            setElementClasses(div, global.globalClass);

            let table: HTMLTableElement = p.createElement("table").elt;
            table.style.width = width + "px";
            table.style.height = height + "px";

            this.addColumnGroup(table, columnWidths);

            let tableBody: HTMLTableSectionElement = table.createTBody();
            for (let i = 0; i < contents.length; i++) {
                this.createRow(tableBody, contents[i]);
            }

            divCreateResult.element.elt.appendChild(table);
        }
        return divCreateResult;
    }

    private static addColumnGroup(table: HTMLTableElement, columnWidths: number[]) {
        this.scaleNumbersToAddUpTo(columnWidths, 100);
        let colgroup: HTMLTableColElement = document.createElement("colgroup");
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

    private static createRow(tableSection: HTMLTableSectionElement, contents: p5.Element[]) {
        let newRow: HTMLTableRowElement = tableSection.insertRow();
        for (let i = 0; i < contents.length; i++) {
            let newCell: HTMLTableCellElement = newRow.insertCell();
            newCell.appendChild(contents[i].elt);
        }
    }
}