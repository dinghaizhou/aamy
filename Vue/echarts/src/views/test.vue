<template>
    <div class="home">
        <div class="panel-top flex">
            <div class="flex panel-top-left">
                <div class="logo flex-c-c">
                    <img src="@/assets/img/logo.png" alt="">
                </div>
                <ul class="top-nav flex">
                    <template v-for='item in permisiionRoutes'>
                        <router-link v-if="item.meta && item.meta.show" :key="item.path" :to="'/' + item.path" tag="li">
                           {{item.meta && item.meta.title}}
                        </router-link>
                    </template>
                </ul>
            </div>
            <div class="flex panel-top-right">
                <div class="notice flex-c-c" @click="$router.push('/user/message')">
                    <img src="@/assets/img/tongzhi.png" alt="">
                    <el-badge :hidden="unread_count == 0" :value="unread_count" class="item" :max='20'>
                        <!-- <el-button size="small" >通知</el-button> -->
                        <p class="name" style="padding:0 10px;">通知</p>
                    </el-badge>
                </div>
                <div class="info flex-c-c">
                        <img v-if="userInfo.icon_url"  :src="userInfo.icon_url" alt="">
                        <img v-else  src="@/assets/img/avatar.jpg" alt="">
                    <el-dropdown style="color: #fff;cursor: pointer;">
                        <span>
                            <span class="name">{{userInfo.account}}</span>
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native="goToUser">用户中心</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    
                </div>
                <div class="logout">
                    <span class="pointer" @click="logout">
                        退出
                    </span>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <div class="qq flex-col">
            <p>点我咨询</p>
            <a class="flex-c-c" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1007067831&site=qq&menu=yes">
                <img border="0" src="http://wpa.qq.com/pa?p=2:1007067831:52" alt="点我咨询" title="点我咨询"/>
                <span>小文</span>
            </a>
            <a class="flex-c-c" target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=1007067831&site=qq&menu=yes">
                <img border="0" src="http://wpa.qq.com/pa?p=2:1007067831:52" alt="点我咨询" title="点我咨询"/>
                <span>小旅</span>
            </a>
        </div>
        <guide></guide>
    </div>
</template>

<script>
// @ is an alias to /src
import * as api from '@/api/index.js'
import Guide from '@/lib/Guide.vue'

export default {
    name: "home",
    components: { Guide },
    mounted() {
        api.getUserInfo()
        .then((res) => {
            this.$store.commit('setUserInfo', res)
        })
        api.getWaitReadCount()
        .then((res) => {
            this.$store.commit('setUnreadCount', res.wait_read)
        })

        this.$nextTick(() => {
            let dom = document.getElementById('/observation')
            if(dom) {
                dom.style.position = 'relative'
                dom.style.zIndex = '10002'
            }
        })
    },
    methods: {
        logout() {
            this.$store.commit("logout");
            this.$router.push("/login");
        },
        goToUser() {
            this.$router.push("/user");
        },
        
    },
    computed: {
        permisiionRoutes() {
            return this.$store.state.permisiionRoutes
        },
        userInfo() {
            return this.$store.state.userInfo
        },
        unread_count() {
            return this.$store.state.unread_count
        }
    }
};
</script>
<style lang="scss" scoped>
    .home {
        .panel-top {
            height: 60px;
            background: #046CE2;
            justify-content: space-between;
            color: #fff;
            font-size: 14px;
            .logo {
                width:200px;
                height: 60px;
            }
            .top-nav {
                height: 60px;
                li {
                    font-weight: 500;
                    width: 150px;
                    text-align: center;
                    line-height: 60px;
                    cursor: pointer;
                }
                .router-link-active {
                    background: #50A2FF;;
                }
            }
            .panel-top-right {
                .notice {
                    cursor: pointer;
                    margin-right: 50px;
                    img {
                        margin-right: 5px;
                    }
                }
                .info {
                    color: #fff;
                    margin-right: 20px;
                    img {
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        margin-right: 10px;
                    }
                }
                .logout {
                    margin-right: 20px;
                    line-height: 30px;
                    span {
                        display: inline-block;
                        padding: 15px 10px;
                    }
                }
            } 
        }
        .qq {
            p {
                background: #c4e0ff;
                color:#046ce2;
                text-align: center;
            }
            border: 1px solid #c4e0ff;
            a {
                color: #046ce2;
                padding: 0 5px;
            }
            position: fixed;
            right: 15px;
            top: 150px;
            z-index: 5001;
        } 
    }
</style>




