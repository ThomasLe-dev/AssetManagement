<template>
    <div class="popup__container z-999">
        <header class="t-popup__header center-y justify-between w-100 h-36">
            <h1 class="t-popup__header--title">Thêm chứng từ điều chuyển</h1>
            <section class="wrapper-icon" @click="$emit('close')" title="Thoát">
                <section class="icon t-popup__header--close"></section>
            </section>
        </header>
        <form>
            <div class="sub-title">Thông tin chung</div>
            <section
                class="popup__content--area"
                :class="{ 'change-height-receiver': isOpenReceiver }"
            >
                <section class="content__area--input content__area--row">
                    <m-input
                        ref="fixedAssetCode"
                        labelStyle="fw-500 font-14"
                        classLabel="fixedAssetCode"
                        :label="labelForm.DocumentCode"
                        placeholderItalics
                        @focus="setInputFocus('fixedAssetCode')"
                        maxlength="50"
                        required
                        tabindex="1"
                    />

                    <m-input
                        classLabel="StartUsingDate"
                        labelStyle="fw-500 font-14"
                        :label="labelForm.DocumentDate"
                        type="date"
                        ref="StartUsingDate"
                        @focus="setInputFocus('StartUsingDate')"
                        :placeholder="placeholderForm.time"
                        required
                        tabindex="10"
                    >
                        <template #iconRight>
                            <section class="wrapper-icon absolute r-6">
                                <section class="icon calendar"></section>
                            </section>
                        </template>
                    </m-input>

                    <m-input
                        classLabel="StartUsingDate"
                        labelStyle="fw-500 font-14"
                        :label="labelForm.TransferDate"
                        type="date"
                        ref="StartUsingDate"
                        @focus="setInputFocus('StartUsingDate')"
                        :placeholder="placeholderForm.time"
                        required
                        tabindex="10"
                    >
                        <template #iconRight>
                            <section class="wrapper-icon absolute r-6">
                                <section class="icon calendar"></section>
                            </section>
                        </template>
                    </m-input>

                    <m-input
                        labelStyle="fw-500 font-14"
                        :label="labelForm.Note"
                        maxlength="255"
                        tabindex="4"
                    />
                </section>
                <section class="table__checkbox flex-row col-gap-50 relative">
                    <section class="flex-row col-gap-8">
                        <m-checkbox @change="toggleReceiver" title="Chọn ban giao nhận" />
                        <span>Chọn ban giao nhận</span>
                    </section>
                    <section class="flex-row col-gap-8" v-if="isOpenReceiver">
                        <m-checkbox title="Chọn ban giao nhận" />
                        <span>Thêm ban giao nhận từ lần nhập trước</span>
                    </section>
                </section>
                <section class="content__area--receiver" v-if="isOpenReceiver">
                    <section class="receiver-header receiver-row">
                        <div class="cell display--center-left font-14">STT</div>
                        <div class="cell display--center-left pl-10 font-14">Họ và tên</div>
                        <div class="cell display--center-left pl-10 font-14">Đại diện</div>
                        <div class="cell display--center-left pl-10 font-14">Chức vụ</div>
                    </section>

                    <section class="receiver-body">
                        <section class="receiver-row" v-for="index in receivers" :key="index">
                            <div class="cell display--center-center font-14 box">{{ index }}</div>
                            <div class="cell display--center-left pl-10 font-14">
                                <m-input
                                    placeholderItalics
                                    maxlength="50"
                                    required
                                    tabindex="1"
                                    placeholder="Nhập họ và tên"
                                    classLabel="w-100 pr-10"
                                />
                            </div>
                            <div class="cell display--center-left pl-10 font-14">
                                <m-input
                                    placeholderItalics
                                    maxlength="50"
                                    required
                                    tabindex="1"
                                    placeholder="Nhập đại diện"
                                    classLabel="w-100 pr-10"
                                />
                            </div>
                            <div class="cell display--center-left pl-10 font-14">
                                <m-input
                                    placeholderItalics
                                    maxlength="50"
                                    required
                                    tabindex="1"
                                    placeholder="Nhập chức vụ"
                                    classLabel="w-100 pr-10"
                                />
                            </div>
                            <div class="cell display--center-left pl-10 font-14 icon-list">
                                <section class="icon arrow-up"></section>
                                <section class="icon arrow-down"></section>
                                <section class="icon addBoxGrey" @click="receivers++"></section>
                                <section class="icon delete" v-if="index > 1" @click="receivers--"></section>
                            </div>
                        </section>
                    </section>
                </section>
            </section>
            <!-- Thao tác tìm kiếm, thêm, xóa tài sản điều chuyển -->
            <section class="popup-detail-action">
                <section class="popup__detail-action--right center-y col-gap-16">
                    <span>Thông tin tài sản điều chuyển</span>
                    <m-input
                        placeholder="Tìm kiếm tài sản"
                        placeholderItalics
                        width="263px !important"
                        @Search="filterListFixedAsset"
                    >
                        <template #iconLeft>
                            <section class="icon search">
                                <m-tooltip content="Tìm kiếm" type="bottom" />
                            </section>
                        </template>
                    </m-input>
                </section>
                <section class="popup__detail-action--left" @click="isOpenForm = true">
                    <m-button>
                        <template #icon>
                            <section class="icon addBoxGrey"></section>
                        </template>
                        Chọn tài sản
                    </m-button>
                </section>
            </section>
            <!-- Thông tin chi tiết tài sản điều chuyển  -->
            <section class="popup-data-list">
                <!-- ------------------------Table start------------------------ -->
                <div class="table">
                    <!-- ------------------------Header------------------------ -->
                    <div class="header--row row pr-4">
                        <div
                            class="header cell display--center-center border--top border--right border--bottom"
                        >
                            <input type="checkbox" />
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--right border--bottom"
                        >
                            STT
                        </div>
                        <div
                            class="header cell display--center-left font-weight--700 border--top border--right border--bottom pl-10"
                        >
                            Mã tài sản
                        </div>
                        <div
                            class="header cell display--center-left font-weight--700 border--top border--right border--bottom pl-10"
                        >
                            Tên tài sản
                        </div>
                        <div
                            class="header cell display--center-right font-weight--700 border--top border--right border--bottom pr-10"
                        >
                            Nguyên giá
                        </div>
                        <div
                            class="header cell display--center-right font-weight--700 border--top border--right border--bottom pr-10"
                        >
                            Giá trị còn lại
                        </div>
                        <div
                            class="header cell display--center-left font-weight--700 border--top border--right border--bottom pl-10"
                        >
                            Bộ phận sử dụng
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--right border--bottom"
                        >
                            Bộ phận điều chuyển đến
                        </div>
                        <div
                            class="header cell display--center-left font-weight--700 border--top border--right border--bottom pl-10"
                        >
                            Lý do
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--bottom"
                        >
                            Chức năng
                        </div>
                    </div>

                    <!-- ------------------------Body------------------------ -->
                    <div class="body-data">
                        <div class="header--row row pr-4">
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
                                class="cell display--center-left border--top border--right border--bottom pl-10"
                            >
                                Phòng CNTT
                            </div>
                            <div
                                class="cell display--center-center border--top border--right border--bottom pl-4 pr-4"
                            >
                                <m-input placeholderItalics maxlength="255" classLabel="w-100" />
                            </div>
                            <div
                                class="cell display--center-left border--top border--right border--bottom pl-4 pr-4"
                            >
                                <m-input placeholderItalics maxlength="255" classLabel="w-100" />
                            </div>
                            <div class="cell display--center-center border--top border--bottom">
                                <section class="icon delete"></section>
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
                            >
                                90000000
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
        </form>
        <footer class="popup-footer center-y col-gap-16">
            <m-button typeButton="outline" width="100px" tabindex="12"> Hủy </m-button>
            <m-button width="100px" @clickButton="submit" tabindex="11"> Lưu </m-button>
        </footer>
        <AssetTransferPick v-if="isOpenForm" @hidden="isOpenForm = false" />
    </div>
</template>

<script>
import AssetTransferPick from './AssetTransferPick.vue'
export default {
    name: 'AssetTransferPopup',
    components: {
        AssetTransferPick
    },
    data() {
        return {
            isOpenForm: false,
            isOpenReceiver: false,
            receivers: 2,
        }
    },
    emits: ['close'],
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
    },
    methods: {
        toggleReceiver() {
            this.isOpenReceiver = !this.isOpenReceiver
        }
    }
}
</script>

<style scoped>
@import '../../css/views/AssetTransferPopup.css';
</style>
