import { defineStore } from 'pinia'

/**
 * Author: LB.Thành (11/7/2023)
 * Khai báo store yearFollow
 */
export const useYearFollow = defineStore('yearFollow', {
    state: () => ({ yearFollow: new Date().getFullYear() }),
    actions: {
        /**
         * Author: LB.Thành (11/7/2023)
         * Hàm tăng năm theo năm hiện tại
         */
        increase() {
            this.yearFollow++
        },
        /**
         * Author: LB.Thành (11/7/2023)
         * Hàm giảm năm theo năm hiện tại
         */
        decrease() {
            this.yearFollow--
        }
    }
})
