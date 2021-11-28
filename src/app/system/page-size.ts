export class PageSize {

    private width: number = 0;

    public currentWidth( n: number ){
        this.width = n;
    }

    get xs(): boolean {
        return this.width <= 576;
    }

    get s(): boolean{
        return this.width > 576;
    }

    get md(): boolean {
        return this.width > 768;
    }

    get l(): boolean {
        return this.width > 992;
    }

}
