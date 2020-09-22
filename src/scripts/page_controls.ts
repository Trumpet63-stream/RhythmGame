import {PaginatedList} from "./paginated_list";
import * as p5 from "p5";
import {global} from "./index";
import {DOMWrapper} from "./dom_wrapper";
import {setElementClasses} from "./ui_util";

export abstract class PageControls {
    public static create(associatedMenuId: string,
                         paginatedList: PaginatedList): { element: p5.Element, alreadyExists: boolean } {
        let p: p5 = global.p5Scene.sketchInstance;
        let pageControlsDiv = DOMWrapper.create(() => {
            return p.createDiv();
        }, "pageControlsDiv");
        if (!pageControlsDiv.alreadyExists) {
            setElementClasses(pageControlsDiv.element, global.globalClass, "page-controls");
        }

        let previousPageButton = DOMWrapper.create(() => {
            return p.createButton("&#8249;");
        }, "previousPageButton");
        if (!previousPageButton.alreadyExists) {
            previousPageButton.element.mouseClicked(() => {
                paginatedList.previousPage();
                DOMWrapper.removeElementById(associatedMenuId);
                pageNumberText.element.html("Page " + (paginatedList.getCurrentPage() + 1));
            });
            previousPageButton.element.addClass("page-control-button");
            pageControlsDiv.element.child(previousPageButton.element);
        }

        let pageNumberText = DOMWrapper.create(() => {
            let textContainer = p.createElement("span");
            textContainer.addClass(global.globalClass);
            return textContainer;
        }, "pageNumberText");
        if (!pageNumberText.alreadyExists) {
            pageControlsDiv.element.child(pageNumberText.element);
            pageNumberText.element.html("Page " + (paginatedList.getCurrentPage() + 1));
        }

        let nextPageButton = DOMWrapper.create(() => {
            return p.createButton("&#8250;");
        }, "nextPageButton");
        if (!nextPageButton.alreadyExists) {
            nextPageButton.element.mouseClicked(() => {
                paginatedList.nextPage();
                DOMWrapper.removeElementById(associatedMenuId);
                pageNumberText.element.html("Page " + (paginatedList.getCurrentPage() + 1));
            });
            nextPageButton.element.addClass("page-control-button");
            pageControlsDiv.element.child(nextPageButton.element);
        }

        return pageControlsDiv;
    }
}