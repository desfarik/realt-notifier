export class RealtFilters {

    filters: string[] = [];

    constructor() {
        return this;
    }

    addRoomCount(roomCount: number) {
        this.filters.push(`rooms=${roomCount}`)
        return this;
    }
    minAreaLiving(area: number) {
        this.filters.push(`areaLivingFrom=${area}`)
        return this;
    }

    notFirstFloor() {
        this.filters.push(`isFirstStorey=false`)
        return this;
    }

    sortByUpdated() {
        this.filters.push('sortType=updatedAt');
        return this;
    }

    filterByMinskDistricts() {
        this.filters.push('addressV2=[{"townDistrictUuid":"4daa4f46-7b00-11eb-8943-0cc47adabd66"},{"townDistrictUuid":"4daa506e-7b00-11eb-8943-0cc47adabd66"},{"townDistrictUuid":"4daa52f9-7b00-11eb-8943-0cc47adabd66"}]')
        return this;
    }

    build() {
        return encodeURI(this.filters.join('&'));
    }
}
