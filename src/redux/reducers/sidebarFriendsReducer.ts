export type FriendsType = {
    id: number
    link: string
}

type SidebarFriendsStateType = {
    friends: FriendsType[]
}

let initialState = {
    friends: [
        {id: 1, link: "https://i.pinimg.com/736x/3f/47/b3/3f47b39a801290271ad789d1ecc053cc.jpg"},
        {id: 2, link: "https://img.joinfo.com/i/2018/06/800x0/5b30ce1e882dc.jpg"},
        {id: 3, link: "https://mobimg.b-cdn.net/v3/fetch/62/620e78234f747fa272d1bbb5a9032467.jpeg"},
    ],
}

const sidebarFriendsReducer = (state: SidebarFriendsStateType = initialState): SidebarFriendsStateType => {
    return state;
}

export default sidebarFriendsReducer;