<template>
    <div class="content" :class="[{ 'content--expand': isChangeWidth }]">
        <div class="content--top">
            <div class="top-left">
                <span class="font-weight--700">Điều Chuyển</span>
                <section class="icon reload"></section>
            </div>
            <section class="layout__header__right center-y col-gap-11">
                <!-- Button thêm chứng từ -->
                <m-button>
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
        <div class="content--body border--left border--right border--bottom">
            <!-- ------------------------Table start------------------------ -->
            <div class="table" ref="contentBody">
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
                    <div
                        class="body--row row"
                        v-for="(asset, index) in assets"
                        :key="asset.FixedAssetId"
                    >
                        <div class="cell display--center-center border--right border--bottom">
                            <input type="checkbox" />
                        </div>
                        <div class="cell display--center-center border--right border--bottom">
                            {{ index + 1 }}
                        </div>
                        <div class="cell display--center-left border--right border--bottom pl-10">
                            {{ asset.FixedAssetCode }}
                        </div>
                        <div class="cell display--center-center border--right border--bottom">
                            {{ asset.FixedAssetName }}
                        </div>
                        <div class="cell display--center-center border--right border--bottom">
                            {{ asset.StartUsingDate }}
                        </div>
                        <div class="cell display--center-right border--right border--bottom pr-10">
                            {{ asset.Cost }}
                        </div>
                        <div class="cell display--center-right border--right border--bottom pr-10">
                            {{ asset.Cost }}
                        </div>
                        <div
                            class="cell display--center-left border--right border--bottom pl-10"
                        ></div>
                        <div class="cell display--center-center border--right border--bottom">
                            <div class="center col-gap-16">
                                <section class="icon edit"></section>
                                <section class="icon delete"></section>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="body-data__footer pr-4">
                    <div class="body--row row">
                        <div class="cell display--center-center border--right border--bottom">
                            <input type="checkbox" />
                        </div>
                        <div class="cell display--center-center border--right border--bottom"></div>
                        <div
                            class="cell display--center-left border--right border--bottom pl-10"
                        ></div>
                        <div class="cell display--center-center border--right border--bottom"></div>
                        <div class="cell display--center-center border--right border--bottom"></div>
                        <div class="cell display--center-right border--right border--bottom pr-10">
                            90000000
                        </div>
                        <div class="cell display--center-right border--right border--bottom pr-10">
                            60000000
                        </div>
                        <div
                            class="cell display--center-left border--right border--bottom pl-10"
                        ></div>
                        <div class="cell display--center-center border--right border--bottom"></div>
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

            <!-- ------------------------Resize bar------------------------ -->
            <div class="resize-bar border--top border--bottom" @mousedown="startResize"></div>

            <!-- ------------------------Table start------------------------ -->
            <div class="resizable-table">
                <div class="content--top">
                    <div class="top-left">
                        <!-- Button thông tin chi tiết -->
                        <m-button>
                            Thông tin chi tiết 
                        </m-button>
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
                            class="header cell display--center-center font-weight--700 border--top border--right border--bottom"
                        >
                            Tên tài sản
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--right border--bottom"
                        >
                            Nguyên giá
                        </div>
                        <div
                            class="header cell display--center-left font-weight--700 border--top border--right border--bottom pl-10"
                        >
                            Giá trị còn lại
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--bottom"
                        >
                            Bộ phận sử dụng
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--bottom"
                        >
                            Bộ phận điều chuyển đến
                        </div>
                        <div
                            class="header cell display--center-center font-weight--700 border--top border--bottom"
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
                                class="body cell display--center-left border--right border--bottom pl-10"
                            >
                                {{ asset.FixedAssetName }}
                            </div>
                            <div class="cell display--center-center border--right border--bottom">
                                {{ asset.FixedAssetName }}
                            </div>
                            <div class="cell display--center-center border--right border--bottom">
                                {{ asset.FixedAssetName }}
                            </div>
                            <div
                                class="cell display--center-left border--right border--bottom pl-10"
                            >
                                {{ asset.FixedAssetName }}
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
    </div>
</template>
<script>
import FixedAssetAPI from '../../api/FixedAsset.API'
export default {
    name: 'AssetTransferList',
    props: {
        isChangeWidth: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // ----------------------------- Data -----------------------------
            assets: [],

            // ----------------------------- Paging -----------------------------
            pageLimitList: [],
            // Tổng bản ghi
            totalRecords: 0,
            // Tổng trang
            totalPages: 0,
            // Trang hiện tại
            currentPage: 1
        }
    },
    created() {
        this.loadData()
    },
    methods: {
        // load data tạm thời
        loadData() {
            FixedAssetAPI.getFixedAssetPaging({
                FixedAssetCodeOrName: '',
                DepartmentName: '',
                FixedAssetCategoryName: '',
                PageLimit: 20,
                PageNumber: 1
            })
                .then((res) => {
                    this.assets = res.data.FixedAssets
                    console.log(this.assets)
                })
                .catch((res) => {
                    console.log(res)
                })
        },
        startResize(event) {
            event.preventDefault() // Ngăn chặn chọn văn bản khi kéo
            document.addEventListener('mousemove', this.resizing)
            document.addEventListener('mouseup', this.stopResize)

            this.startY = event.clientY // Lưu vị trí chuột xuất phát
            this.initialHeight = parseFloat(
                getComputedStyle(this.$el.querySelector('.resizable-table')).height
            ) // Lưu kích thước ban đầu của resizable-table
        },
        resizing(event) {
            const movementY = this.startY - event.clientY // Tính toán khoảng cách di chuyển của chuột
            const newHeight = this.initialHeight + movementY // Tính toán chiều cao mới dựa trên kích thước ban đầu và khoảng cách di chuyển

            const minHeight = 0 // Độ cao tối thiểu
            const maxHeight = 8000 // Độ cao tối đa
            console.log(this.$refs.contentBody.clientHeight)

            // Áp dụng độ cao mới vào resizable-table và giữ nguyên con trỏ
            this.$el.querySelector('.resizable-table').style.height = `${Math.min(
                Math.max(newHeight, minHeight),
                maxHeight
            )}px`
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
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 14px;
    display: flex;
    flex-direction: column;
    transition: all ease-in-out 0.1s;
    padding-top: 13px;
}

/* .content--expand {
    width: calc(100% - 66px);
  } */

.content--top {
    display: flex;
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

.top-left button{
    height: 26px !important;
}

.top-left span {
    font-size: 20px;
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
    width: 100%;
    height: 800px;
    background-color: var(--background-color-default);
    border-spacing: unset;
}

.row {
    display: grid;
    grid-template-columns: 40px 40px 120px 180px 230px 150px 200px calc(100% - 1080px) 120px;
    height: 35px;
}

.resizable-table__row{
    display: grid;
    grid-template-columns: 40px 120px 120px 180px 230px 150px 200px calc(100% - 960px);
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

.header input[type='text'] {
    width: 100%;
    height: 100%;
}

.body--row:hover .cell {
    background-color: var(--table-body-hover);
}

.body {
    color: var(--table-body-text-color);
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
    height: 2px;
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
</style>
