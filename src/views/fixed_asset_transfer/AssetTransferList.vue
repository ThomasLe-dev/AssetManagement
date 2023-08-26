<template>
    <div class="content" >
        <div class="content--top" ref="contentTop">
            <div class="top-left">
                <span class="font-weight--700">Điều Chuyển</span>
                <section class="icon reload" @click="this.loadData"></section>
            </div>
            <section class="layout__header__right center-y col-gap-11">
                <!-- Button thêm chứng từ -->
                <m-button @click="isShowPopup = true">
                    <template #icon>
                        <section class="icon addBox"></section>
                    </template>
                    Thêm chứng từ
                </m-button>
                <!--  -->

                <!-- Button nhắn tin -->
                <m-button typeButton="icon">
                    <section class="icon contact"></section>
                    <m-tooltip content="Nhắn tin" />
                </m-button>
                <!--     -->

                <!-- Button hỏi đáp -->
                <m-button typeButton="icon">
                    <section class="icon help"></section>
                    <m-tooltip content="Hỏi đáp" />
                </m-button>
                <!--  -->
            </section>
        </div>
        <div class="content--body border--left border--right border--bottom" ref="contentBody">
            <div class="body-top" ref="bodyTop">
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
                            Mã chứng từ
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--right border--bottom"
                        >
                            Ngày điều chuyển
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--right border--bottom"
                        >
                            Ngày chứng từ
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
                            Ghi chú
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--bottom"
                        >
                            Chức năng
                        </div>
                    </div>

                    <!-- ------------------------Body------------------------ -->
                    <div class="body-data">
                        <section v-if="!isLoadingDataTable">
                            <div
                                class="body--row row"
                                v-for="(asset, index) in assets"
                                :key="asset.FixedAssetId"
                            >
                                <div
                                    class="cell display--center-center border--right border--bottom"
                                >
                                    <input type="checkbox" />
                                </div>
                                <div
                                    class="cell display--center-center border--right border--bottom"
                                >
                                    {{ index + 1 }}
                                </div>
                                <div
                                    class="cell display--center-left border--right border--bottom pl-10"
                                >
                                    {{ asset.FixedAssetCode }}
                                </div>
                                <div
                                    class="cell display--center-center border--right border--bottom"
                                >
                                    {{ asset.FixedAssetName }}
                                </div>
                                <div
                                    class="cell display--center-center border--right border--bottom"
                                >
                                    {{ asset.StartUsingDate }}
                                </div>
                                <div
                                    class="cell display--center-right border--right border--bottom pr-10"
                                >
                                    {{ asset.Cost }}
                                </div>
                                <div
                                    class="cell display--center-right border--right border--bottom pr-10"
                                >
                                    {{ asset.Cost }}
                                </div>
                                <div
                                    class="cell display--center-left border--right border--bottom pl-10"
                                ></div>
                                <div
                                    class="cell display--center-center border--right border--bottom"
                                >
                                    <div class="center col-gap-16">
                                        <section class="icon edit"></section>
                                        <section class="icon delete"></section>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section v-else><LoadingSkeleton v-for="i in 5" :key="i" /></section>
                    </div>
                    <div class="body-data__footer pr-4">
                        <div class="body--row row">
                            <div class="cell display--center-center border--right border--bottom">
                            </div>
                            <div
                                class="cell display--center-center border--right border--bottom"
                            ></div>
                            <div
                                class="cell display--center-left border--right border--bottom pl-10"
                            ></div>
                            <div
                                class="cell display--center-center border--right border--bottom"
                            ></div>
                            <div
                                class="cell display--center-center border--right border--bottom"
                            ></div>
                            <div
                                class="cell font-weight--700 display--center-right border--right border--bottom pr-10"
                            >
                                90000000
                            </div>
                            <div
                                class="cell font-weight--700 display--center-right border--right border--bottom pr-10"
                            >
                                60000000
                            </div>
                            <div
                                class="cell display--center-left border--right border--bottom pl-10"
                            ></div>
                            <div
                                class="cell display--center-center border--right border--bottom"
                            ></div>
                        </div>
                    </div>
                </div>
                <!-- ------------------------Table end------------------------ -->

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
                        <!-- v-if="pageNumberEnd > 0" -->
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

            <!-- ------------------------Resize bar------------------------ -->
            <div class="resize-bar border--top border--bottom" @mousedown="startResize"></div>

            <!-- ------------------------Table start------------------------ -->
            <div class="resizable-table z-999" ref="resizableTable">
                <div class="content--top" ref="tableTop">
                    <div class="top-left">
                        <!-- Button thông tin chi tiết -->
                        <m-button> Thông tin chi tiết </m-button>
                        <!--  -->
                    </div>
                    <div class="top-right">
                        <MISAIcon drop_down></MISAIcon>
                    </div>
                </div>
                <div class="table table-bot">
                    <!-- ------------------------Header------------------------ -->
                    <div class="header--row resizable-table__row">
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
                            class="header cell display--center-left font-weight--700 border--top border--right border--bottom pl-10"
                        >
                            Bộ phận điều chuyển đến
                        </div>
                        <div
                            class="header cell display--center-left font-weight--700 border--top border--bottom pl-10"
                        >
                            Lý do
                        </div>
                    </div>

                    <!-- ------------------------Body------------------------ -->
                    <div class="body-data">
                        <div
                            class="body--row resizable-table__row"
                            v-for="asset in assets"
                            :key="asset.FixedAssetId"
                        >
                            <div class="cell display--center-center border--right border--bottom">
                                {{ 1 }}
                            </div>
                            <div
                                class="cell display--center-left border--right border--bottom pl-10"
                            >
                                {{ asset.FixedAssetCode }}
                            </div>
                            <div
                                class="cell display--center-left border--right border--bottom pl-10"
                            >
                                {{ asset.FixedAssetName }}
                            </div>
                            <div
                                class="cell display--center-right border--right border--bottom pr-10"
                            >
                                {{ asset.Cost }}
                            </div>
                            <div
                                class="cell display--center-right border--right border--bottom pr-10"
                            >
                                {{ asset.Cost }}
                            </div>
                            <div class="cell display--center-center border--bottom">
                                <div class="icon-function">
                                    <MISATooltip bottom content="Chỉnh sửa">
                                        <MISAIcon edit background></MISAIcon>
                                    </MISATooltip>
                                    <MISATooltip bottom content="Sao chép">
                                        <MISAIcon copy background></MISAIcon>
                                    </MISATooltip>
                                    <MISATooltip bottom content="Xóa">
                                        <MISAIcon deleteIcon background></MISAIcon>
                                    </MISATooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- ------------------------Table end------------------------ -->

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
                            v-if="pageNumberEnd > 0"
                            classPaging="footer__left__number-page"
                            v-model="pageNumber"
                            :numberEnd="pageNumberEnd"
                        />
                        <!--  -->
                    </section>
                </footer>
                <!--  -->
            </div>
        </div>
        <AssetTransferPopup v-if="isShowPopup" @close="isShowPopup = false" />
    </div>
</template>

<script>
import FixedAssetAPI from '../../api/FixedAsset.API'
import LoadingSkeleton from '../fixed_asset/LoadingSkeleton.vue'
import AssetTransferPopup from './AssetTransferPopup.vue'

export default {
    name: 'AssetTransferList',
    components: {
        LoadingSkeleton,
        AssetTransferPopup
    },
    props: {
        isChangeWidth: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            assets: [],
            pageLimit: 20,
            totalRecords: 0,
            totalPages: 0,
            currentPage: 1,
            isLoadingDataTable: false,
            isShowPopup: false,
            startY: 0,
            initialHeight: 0,
            // ----------------------------- Resize table -----------------------------
            // Hiển thị tooltip của icon resize
            visible_tool_tip: false,
            // Kiểm tra coi đã nhấn giữ icon resize chưa
            isMouseDown: false,
            // Điểm bắt đầu của chuột khi click vào khối div resize bar
            startY: null,
            // Chiều cao ban đầu của resizable table
            initialHeight: null,
            // Chiều cao ban đầu của resizable table (giá trị không thể đổi)
            initialHeightFix: null,
            // Chiều cao của resizable table khi đang resize
            initialHeightAfterResize: null,
            // Chiều cao ban đầu của table top (giá trị không thể đổi)
            tableTopHeightFix: null,
            // Thu gọn table bằng icon
            isNarrow: false
        }
    },
    mounted() {
        this.loadData()
    },
    methods: {
        async loadData() {
            try {
                this.isLoadingDataTable = true
                let res = await FixedAssetAPI.getAllFixedAsset()
                this.assets = res.data
            } catch (error) {
                console.log(error)
            }
            setTimeout(() => {
                this.isLoadingDataTable = false
            }, 1000)
        },
        startResize(event) {
            event.preventDefault() // Ngăn chặn chọn văn bản khi kéo
            document.addEventListener('mousemove', this.resizing)
            document.addEventListener('mouseup', this.stopResize)

            this.startY = event.clientY // Lưu vị trí chuột xuất phát
            this.initialHeight = this.$refs.resizableTable.clientHeight // Lưu kích thước ban đầu của resizable-table
        },
        resizing(event) {
            const movementY = this.startY - event.clientY // Tính toán khoảng cách di chuyển của chuột
            const newHeight = this.initialHeight + movementY // Tính toán chiều cao mới dựa trên kích thước ban đầu và khoảng cách di chuyển

            const contentBodyHeight = this.$refs.contentBody.clientHeight
            const minHeight = this.$refs.tableTop.clientHeight; // Độ cao tối thiểu
            const maxHeight = contentBodyHeight // Độ cao tối đa
            // Áp dụng độ cao mới vào resizable-table và giữ nguyên con trỏ
            this.$refs.resizableTable.style.height = `${Math.min(
                Math.max(newHeight, minHeight),
                maxHeight
            )}px`
            this.initialHeightAfterResize = this.$refs.resizableTable.clientHeight
            this.$refs.bodyTop.style.height = `${
                contentBodyHeight - Math.min(Math.max(newHeight, minHeight), maxHeight)
            }px`
            document.body.style.cursor = 'ns-resize'
        },

        stopResize() {
            document.removeEventListener('mousemove', this.resizing)
            document.removeEventListener('mouseup', this.stopResize)
            document.body.style.cursor = 'auto' // Trả lại con trỏ mặc định
        }
    }
}
</script>

<style scoped>
.content {
    box-sizing: border-box;
    display: flex;
    width: 100%;
    height: 700px;
    flex-direction: column;
    transition: all ease-in-out 0.1s;
    padding-top: 13px;
    float: right;
    padding-bottom: 14px;
}

.content--top {
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: var(--background-color-default);
    padding: 8px 8px;
}

.top-left {
    display: flex;
    align-items: center;
    column-gap: 8px;
}

.top-left > button {
    height: 26px !important;
}

.top-left span {
    font-size: 20px;
}

.body-top{
    display: flex;
    flex-direction: column;

}

.content--body {
    width: 100%;
    height: calc(100% - 36px);
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-color: var(--table-border-color);
}

/* ------------------------------------------- Table ------------------------------------------- */
.table {
    display: flex;
    flex-direction: column;
    background-color: var(--background-color-default);
    border-spacing: unset;
    flex: 1;
}

.row {
    display: grid;
    grid-template-columns: 40px 40px 120px 180px 230px 150px 200px calc(100% - 1080px) 120px;
    height: 35px;
}

.resizable-table__row {
    display: grid;
    grid-template-columns: 40px 100px 200px 160px 180px 180px 180px calc(100% - 1040px);
    height: 35px;
}

.cell {
    min-height: 35px;
    background-color: var(--background-color-default);
    border-color: var(--table-border-color);
    cursor: pointer;
}

.icon-function {
    display: flex;
    column-gap: 8px;
}

.header {
    background-color: var(--background-color-table-head);
}

.body--row:hover .cell {
    background-color: var(--table-body-hover);
}

.body-data {
    overflow-y: auto;
    max-height: 175px;
}

.body-data::-webkit-scrollbar {
    width: 4px;
    background-color: #fff;
}

.body-data::-webkit-scrollbar-thumb {
    background-color: var(--border);
    border-radius: 50px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.16);
    cursor: pointer;
}

/* ------------------------------------------- Resize-bar ------------------------------------------- */
.resize-bar {
    height: 8px;
    border-color: var(--resize-bar-color);
    background-color: var(--background-color-default);
    cursor: ns-resize;
}

.resizable-table {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.table-bot {
    flex: 1;
}
.table-container {
    height: calc(698px - 39px);
    width: 100%;
    border-radius: 3.5px;
}

.table {
    background-color: #ffffff;
    border-spacing: unset;
    border: unset;
    border-radius: 3.5px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.16);
}

thead {
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #ffffff;
}

.table__head {
    font-family: Roboto, sans-serif;
    font-weight: 700;
    text-align: left;
    height: 38px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 15px;
    cursor: context-menu;
}

.table__head--right {
    text-align: right;
}

.table__head--center {
    text-align: center;
}

#tbodyAsset {
    height: calc(100% - 38px);
}

.table__body {
    font-family: Roboto, sans-serif;
    font-weight: 400;
    height: 39px;
    border-bottom: 1px solid #e0e0e0;
    font-size: 15px;
    position: relative;
}

.tr--body-selected {
    background-color: rgba(26, 164, 200, 0.2);
}

.tr--body {
    cursor: pointer;
}

.tr--body:hover {
    background-color: rgba(26, 164, 200, 0.2);
}

.tr--body > .table__body > .icon-function {
    display: none;
}

.tr--body:hover > .table__body > .icon-function {
    display: flex;
    column-gap: 16px;
}

.table__body--right {
    text-align: right;
}

.table__body--center {
    text-align: center;
}

.table__body--center-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.icon-function {
    align-items: center;
    justify-content: center;
    column-gap: 16px;
}

.reload {
    background-position: -110px -68px;
    width: 20px;
    height: 16px;
    margin-left: 8px;
}

.contact {
    background-position: -67px -23px;
    width: 18px;
    height: 18px;
}
</style>
