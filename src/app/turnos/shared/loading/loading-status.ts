export class LoadingStatus {

    private loading = false;

    constructor() {}

    finish() {
        this.loading = false;
    }

    start() {
        this.loading = true;
    }

    status() {
        return this.loading;
    }
}
