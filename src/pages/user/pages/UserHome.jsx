import React, { useEffect, useState, useRef, useCallback } from "react"
import { useSelector, useDispatch } from "react-redux"
import main from "styles.module.css"
import styles from "../user.module.css"
import { useParams, Route, NavLink } from "react-router-dom";
import { Home, AddCircle, ArrowBackIos, ArrowForwardIos, Favorite, FavoriteBorder, Person, PlayCircleFilledWhite } from '@material-ui/icons';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Avatar, Divider } from "@material-ui/core"
import sortByProp from "helpers/sortByProp";
import useSWR, { responseInterface } from "swr";
import fetch from 'unfetch'


const theme = createMuiTheme({
    // Style sheet name ⚛️
    palette: {
        primary: { main: '#333333' },
        secondary: { main: '#f55858' },
    }
});

export function UserHome({ nextStage, user, userfeed, usersubs, account }) {

    const [followButtonState, setFollowButtonState] = useState("isme")
    const JSONFetcher = url => fetch(url).then(r => r.text())

    useEffect(() => {
        if (user.account.address === account.address) {
            setFollowButtonState('isme')
            console.log('this user is me')
        } else if (account.subs[user.account.address]) {
            setFollowButtonState('isfollow')
            console.log('this user is a sub')
        } else {
            setFollowButtonState('canfollow')
            console.log('this user can be a sub')
        }
    }, [user.subs])

    const postId = "1de454a67e435e2fe76871322e996ec1f422c7ecbffe66b406f2a2c4945cd685"

    const { data, error } = useSWR('https://swarm-gateways.net/bzz:/' + postId, JSONFetcher);
    if (data) { const cleanData = JSON.parse(data); console.log(cleanData) }

    const handleFollow = () => {
        console.log('follow')
    }

    const handleUnFollow = () => {
        console.log('unfollow')
    }

    const dispatch = useDispatch()

    function followbutton(followButtonState) {
        switch (followButtonState) {
            case 'isme':
                console.log('this user is me')
                return (<div></div >)
            case 'canfollow':
                console.log('this user can be followed')
                return (<div onClick={() => dispatch({ type: 'FOLLOW_USER', data: { address: user.account.address, currentSubs: account.subs } })} className={styles.followButton}>
                    Follow
                </div>)
            case 'isfollow':
                console.log('already following user')
                return (<div onClick={() => handleUnFollow()} className={styles.followButton}>
                    Unfollow
                </div>)
            default:
                return (<div className={styles.followButton}>
                    Dunno
                </div>)
        }
    }




    return (
        <ThemeProvider theme={theme}>
            <div className={main.container}>
                <div className={main.header}>
                    <div><NavLink className={main.textbutton} to="/"><ArrowBackIos color="primary"></ArrowBackIos></NavLink></div>
                    <div className={[main.textbutton, main.bodyDefault, main.blue].join()}>{user.account.username}</div>
                    <div>&nbsp;</div>
                </div>
                <div className={styles.usersection}>
                    <img className={styles.avatarImage} src={user.account.useravatar} alt="avatar" />
                    <div className={styles.followingContainer}>
                        <div className={styles.followingItem}>
                            <div className={styles.followingNumber}>{userfeed.length}</div>
                            <div className={styles.followingLabel}>Posts</div>
                        </div>
                        <div className={styles.followingItem} onClick={nextStage}>
                            <div className={styles.followingNumber}>{usersubs.length}</div>
                            <div className={styles.followingLabel}>Following </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.userName}>{user.account.username}</div>
                        <div className={styles.userAddress}>{user.account.address}</div>
                    </div>


                    {followbutton(followButtonState)}


                </div>
                <div className={main.blue}>RAW </div>

                <div className={styles.scroller}>
                    {userfeed.map((item) => (
                        <img className={styles.postImage} src={item.image}></img>
                    ))}
                </div>

                <div className={main.footer}>
                    <div className={main.textbutton}>
                        <NavLink to="/">
                            <Home

                                color="primary"
                                fontSize="large"></Home>
                        </NavLink>
                    </div>
                    <div className={main.textbutton}>
                        {account.status === "noAccount" ?
                            <NavLink to="/create-account">
                                <AddCircle color="primary" fontSize="large"></AddCircle>
                                {/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */}
                            </NavLink>
                            :
                            <NavLink to="/post-item">
                                <AddCircle color="primary" fontSize="large"></AddCircle>
                                {/* <div className={main.iconbuttonbig}>
                                <div className={main.plusicon}></div>
                            </div> */}
                            </NavLink>
                        }

                    </div>
                    <div className={main.textbutton}>
                        {account.status === "noAccount" ?
                            <NavLink to="/create-account">
                                <img className={main.avatarImage} src={account.avatar}></img>
                            </NavLink>
                            :
                            <NavLink to="/account">
                                <img className={main.avatarImage} src={account.avatar}></img>
                            </NavLink>
                        }
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default UserHome;