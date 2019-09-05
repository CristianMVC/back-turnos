export class DateFactory {

    static create(json: any): Date[] {
        return json.result.map((dateObj: any) => {
            const [year, month, day] = dateObj.fecha.split('-');
            return new Date(year, month - 1, day);
        })
    }
}
