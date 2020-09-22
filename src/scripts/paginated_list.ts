export abstract class PaginatedList {
    private static DEFAULT_PAGE_SIZE: number = 50;
    protected currentPage: number;
    protected pageSize: number;
    public currentContents: any[];
    protected allContents: any[];

    public getCurrentPage(): number {
        return this.currentPage;
    }

    public nextPage() {
        this.setPage(this.currentPage + 1);
    }

    public previousPage() {
        this.setPage(this.currentPage - 1);
    }

    protected setPage(pageNumber: number, pageSize?: number) {
        pageSize = this.getValidPageSize(pageSize);
        if (!this.isValidPageNumber(pageNumber, pageSize)) {
            return;
        }

        let minIndex = pageNumber * pageSize;
        let maxIndex = minIndex + pageSize;
        this.currentContents = [];
        for (let i = minIndex; i < maxIndex; i++) {
            if (i < this.allContents.length) {
                this.currentContents.push(this.allContents[i]);
            }
        }
        this.currentPage = pageNumber;
        this.pageSize = pageSize;
    }

    private isValidPageNumber(pageNumber: number, pageSize: number) {
        return 0 <= pageNumber && pageNumber <= this.getMaxPageNumber(pageSize);
    }

    private getValidPageSize(pageSize: number) {
        if (pageSize === undefined) {
            return PaginatedList.DEFAULT_PAGE_SIZE;
        } else if (pageSize < 1) {
            return 1;
        } else if (pageSize > 100) {
            return 100;
        }
    }

    private getMaxPageNumber(pageSize: number) {
        return Math.floor(this.allContents.length / pageSize);
    }
}