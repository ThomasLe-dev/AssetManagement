<template>
    <div class="pick-popup z-999">
        <form class="t-popup" ref="form" @keyup.esc="showToast">
            <header class="t-popup__header center-y justify-between w-100 h-36">
                <h1 class="t-popup__header--title">Chọn tài sản điều chuyển</h1>
                <section class="wrapper-icon" @click="$emit('hidden')" title="Thoát">
                    <section class="icon t-popup__header--close"></section>
                </section>
            </header>
            <main class="t-popup__header--body edit__body pick-popup-body">
                <section class="table-data">
                    <!-- ------------------------Table start------------------------ -->
                    <div class="table">
                        <!-- ------------------------Header------------------------ -->
                        <div class="header--row row pr-4">
                            <div
                                class="header cell display--center-center border--right border--bottom"
                            >
                                <input type="checkbox" />
                            </div>
                            <div
                                class="header cell display--center-center font-weight--700 border--right border--bottom"
                            >
                                STT
                            </div>
                            <div
                                class="header cell display--center-left font-weight--700 border--right border--bottom pl-10"
                            >
                                Mã tài sản
                            </div>
                            <div
                                class="header cell display--center-left font-weight--700 border--right border--bottom pl-10"
                            >
                                Tên tài sản
                            </div>
                            <div
                                class="header cell display--center-left font-weight--700 border--right border--bottom pl-10"
                            >
                                Bộ phận sử dụng
                            </div>
                            <div
                                class="header cell display--center-right font-weight--700 border--right border--bottom pr-10"
                            >
                                Nguyên giá
                            </div>
                            <div
                                class="header cell display--center-right font-weight--700 border--right border--bottom pr-10"
                            >
                                Giá trị còn lại
                            </div>
                            <div
                                class="header cell display--center-right font-weight--700 border--right border--bottom pr-10"
                            >
                                Năm theo dõi
                            </div>
                        </div>

                        <!-- ------------------------Body------------------------ -->
                        <div class="body-data">
                            <div class="body--row row pr-4 tr--body">
                                <div
                                    class="cell display--center-center border--top border--right border--bottom"
                                >
                                    <input type="checkbox" />
                                </div>
                                <div
                                    class="cell display--center-center border--top border--right border--bottom"
                                >
                                    1
                                </div>
                                <div
                                    class="cell display--center-left border--top border--right border--bottom pl-10"
                                >
                                    TS001
                                </div>
                                <div
                                    class="cell display--center-left border--top border--right border--bottom pl-10"
                                >
                                    Máy tính cá nhân
                                </div>
                                <div
                                    class="cell display--center-left border--top border--right border--bottom pl-10"
                                >
                                    Phòng CNTT
                                </div>
                                <div
                                    class="cell display--center-right border--top border--right border--bottom pr-10"
                                >
                                    1000000
                                </div>
                                <div
                                    class="cell display--center-right border--top border--right border--bottom pr-10"
                                >
                                    500000
                                </div>
                                <div
                                    class="cell display--center-right border--top border--right border--bottom pr-10"
                                >
                                    2023
                                </div>
                            </div>
                        </div>
                        <div class="body-data__footer pr-4">
                            <div class="row">
                                <div class="cell display--center-center border--bottom"></div>
                                <div class="cell display--center-center border--bottom"></div>
                                <div class="cell display--center-left border--bottom pl-10"></div>
                                <div
                                    class="cell display--center-center border--right border--bottom"
                                ></div>
                                <div
                                    class="cell display--center-right font-weight--700 border--right border--bottom pr-10"
                                ></div>
                                <div
                                    class="cell display--center-right font-weight--700 border--right border--bottom pr-10"
                                >
                                    60000000
                                </div>
                                <div
                                    class="cell display--center-right font-weight--700 border--right border--bottom pr-10"
                                >
                                    60000000
                                </div>
                            </div>
                        </div>
                        <!-- Footer -->
                        <footer class="table__footer h-40 grid bg-white">
                            <!-- Footer left -->
                            <section class="table__footer_left center-y">
                                <!-- Tổng số tài sản -->
                                <section class="footer__left__info">
                                    Tổng số: <span>{{ 5 }}</span> bản ghi
                                </section>
                                <!--  -->

                                <!-- Chọn số tài sản trong một trang -->
                                <m-dropdown v-model="pageLimit" />
                                <!--  -->

                                <!-- Thay đổi trang -->
                                <m-paging
                                    classPaging="footer__left__number-page"
                                    v-model="pageNumber"
                                    :numberEnd="5"
                                />
                                <!--  -->
                            </section>
                        </footer>
                        <!--  -->
                    </div>
                    <!-- ------------------------Table end------------------------ -->
                </section>
                <section class="table-details">
                    <div class="mr-20">
                        <m-input
                            labelStyle="fw-500 font-14"
                            classLabel="fixedAssetCode"
                            :label="labelForm.NewDepartmentName"
                            placeholderItalics
                            maxlength="50"
                            required
                        />
                    </div>
                    <div>
                        <m-input
                            labelStyle="fw-500 font-14"
                            classLabel="fixedAssetCode"
                            :label="labelForm.Note"
                            placeholderItalics
                            maxlength="255"
                        />
                    </div>
                </section>
            </main>

            <footer class="t-popup__footer center-y">
                <m-button
                    typeButton="outline"
                    width="100px"
                    style="border: none"
                    @clickButton="showToast"
                    tabindex="12"
                >
                    Hủy
                </m-button>
                <m-button width="100px" @clickButton="submit" tabindex="11">Đồng ý</m-button>
            </footer>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AssetTransferPick',
    data() {
        return {
            isOpenPopup: true
        }
    },
    emits: ['hidden'],
    computed: {
        /**
         * @description Lấy nội dung label trên form nhập liệu
         * @author LB.Thành (27-07-2023)
         */
        labelForm() {
            return this.$_MISAResource.VN.labelForm
        },
        /**
         * @description Lấy nội dung placeholder trên form nhập liệu
         * @author LB.Thành (27-07-2023)
         */
        placeholderForm() {
            return this.$_MISAResource.VN.placeholderForm
        }
    }
}
</script>

<style scoped>
@import '../../css/views/AssetTransferPick.css';
</style>
