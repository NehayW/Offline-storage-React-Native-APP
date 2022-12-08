import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView, Image, BackHandler, Alert, FlatList, Dimensions } from "react-native";
import fonts from "../../Assets/fonts";
import { db } from "../../Utils/Database";
import { HEIGHT, WIDTH } from "../../Utils/Dimensions";
import { styles } from "./styles";

const jsonData = [
    { id: 0, title: 'All Task' },
    { id: 1, title: 'In Progress' },
    { id: 2, title: 'Completed' },
]

export const HomeScreen = ({ navigation }) => {

    const [username, setUserName] = useState('')
    const [data, setData] = useState([])
    const [jData, setJData] = useState(jsonData)
    const [type, setType] = useState('')
    const [selectedId, setSelectedId] = useState(0)
    const [visible, setVisible] = useState(false)
    const [activeId, setActiveId] = useState()
    const [currentIdx, setCurrentIdx] = useState()
    const [items, setItems] = useState([])

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Hold on!", "Are you sure you want to go back?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "YES", onPress: () => BackHandler.exitApp() }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getUserData()
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM items', [],
                    (obj, result) => {
                        const dt = result.rows._array
                        setData(dt)
                    }
                )
            })
        })
        return unsubscribe;
    }, [navigation, data, items])

    useEffect(() => {
        getUserData()
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM items', [],
                (obj, result) => {
                    const dt = result.rows._array
                    setData(dt)
                }
            )
        })
    }, [data, items])

    const getUserData = async () => {
        db.transaction(tx => {
            tx.executeSql('SELECT UserName,Password FROM users', [],
                (obj, result) => {
                    setUserName(result.rows.item(0).UserName)
                }
            )
        });
    }

    const handleDelete = (id) => {
        db.transaction(tx => {
            tx.executeSql('DELETE FROM items WHERE id = ? ', [activeId],
                (xtObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        let arr = data.filter(e => {
                            if (e.id === activeId) {
                                return false
                            } else {
                                return true
                            }
                        })
                        setData(arr)
                    }
                }
            )
        })
        setVisible(false)
    }
    const handleDone = () => {
        db.transaction(tx => {
            let check = (items.isChecked === null || items.isChecked === 0) ? 1 : 0
            tx.executeSql("UPDATE items SET isChecked = ? WHERE id = ?", [check, activeId],
                (txObj, result) => {
                    if (result.rowsAffected > 0) {
                        let arr = [];
                        data.map((item, idx) => {
                            if (currentIdx === idx) {
                                item.isChecked = !item.isChecked
                            }
                            arr.push(item)
                        })

                        setData([...arr]);
                        setItems([...arr])
                    }
                }
            )
        })


        setVisible(false)
    }

    const handleAddInProgress = () => {
        db.transaction(tx => {
            let check = (items.isChecked === null || items.isChecked === 0) ? 1 : 0
            tx.executeSql("UPDATE items SET isInProgress = ?  WHERE id = ?", [check, activeId],
                (txObj, result) => {
                    if (result.rowsAffected > 0) {
                        let arr = [];
                        data.map((item, idx) => {
                            if (idx === currentIdx) {
                                item.isInProgress = !item.isInProgress
                            }
                            arr.push(item)
                        })
                        setData([...arr]);
                        setItems([...arr])
                    }
                }
            )
        })
        setVisible(false)
    }

    const handlePath = (item) => {
        if (item.title === 'Completed') {
            setType('Completed')
        } else if (item.title === 'In Progress') {
            setType('Progress')
        } else {
            setType('Create')
        }
    }

    const popUp = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setVisible(!visible);
                }}
            >
                <View style={styles.modal}>
                    <Text style={{
                        fontSize: 18,
                        fontFamily: fonts.RobotoMedium
                    }}>Task: <Text style={{
                        fontSize: 18,
                        fontFamily: fonts.RobotoRegular
                    }}>{items.task}</Text></Text>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => handleDelete()}
                            style={[styles.button, { backgroundColor: '#fff' }]}>
                            <Text style={[styles.text, { color: '#f57e59' }]}>Delete Task</Text>
                            <Image source={require('../../Assets/icon/delete.png')}
                                style={[styles.icons, {
                                    tintColor: '#f57e59'
                                }]} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleAddInProgress()}
                            disabled={items.isChecked === 1 ? true : false}
                            style={[styles.button, {
                                backgroundColor:
                                    items.isInProgress === 1 ? 'red' : '#f69697'
                            }]}
                        >
                            <Text style={styles.text}>InProgress</Text>
                            <Image source={require('../../Assets/icon/progress.png')}
                                style={[styles.icons, {
                                    tintColor: '#fff'
                                }]} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleDone()}
                            style={[styles.button, {
                                backgroundColor: items.isChecked === 1 ? 'green' : '#6c9178'
                            }]}>
                            <Text style={styles.text}>Done</Text>
                            <Image source={require('../../Assets/icon/check.png')}
                                style={[styles.icons, {
                                    tintColor: '#fff'
                                }]} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <Text style={{
                            fontSize: 18,
                            textAlign: 'center',
                            marginTop: 10
                        }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }

    const renderItem = ({ item, index }) => {
        return (
            type === 'Completed' ?
                (
                    (item.isChecked === true && item.isInProgress === 1) || item.isChecked === 1 ?
                        <View
                            style={[styles.list, {
                                justifyContent: 'space-between', marginVertical: 10,
                                padding: 15,
                            }]}>
                            <View style={{
                                width: '70%', flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={styles.indexBox}>
                                    <Image source={require('../../Assets/icon/list.png')}
                                        style={styles.icon1} />
                                </View>
                                <View>
                                    <Text style={styles.task}>{item.task}</Text>
                                    <Text style={styles.date}>{item.date}</Text>
                                </View>
                            </View>

                            <TouchableOpacity
                                onPress={() => handleDelete(item.id)}
                            >
                                <Image source={require('../../Assets/icon/delete.png')}
                                    style={[styles.icons, {
                                        tintColor: '#f57e59'
                                    }]} />
                            </TouchableOpacity>
                        </View>
                        : null
                ) :
                type === 'Progress' ? (
                    (item.isInProgress === 1 && item.isChecked == true) ? null
                        : item.isInProgress === 1 ?
                            <View
                                style={[styles.list, {
                                    justifyContent: 'space-between', marginVertical: 10,
                                    padding: 15,
                                }]}>
                                <View style={{
                                    width: '70%', flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.indexBox}>
                                        <Image source={require('../../Assets/icon/list.png')}
                                            style={styles.icon1} />
                                    </View>
                                    <View>
                                        <Text style={styles.task}>{item.task}</Text>
                                        <Text style={styles.date}>{item.date}</Text>
                                    </View>
                                </View>

                                <TouchableOpacity
                                    onPress={() => handleDelete(item.id)}
                                >
                                    <Image source={require('../../Assets/icon/delete.png')}
                                        style={[styles.icons, {
                                            tintColor: '#f57e59'
                                        }]} />
                                </TouchableOpacity>
                            </View>
                            : null
                ) : (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('CreateTask', {
                                items: item,
                                index: index,
                                task: item.task,
                                desc: item.desc,
                                date: item.date,
                                type: 'Update'
                            })
                        }}
                        style={[styles.list, {
                            justifyContent: 'space-between', marginVertical: 10,
                            backgroundColor: item.isChecked === 1 ? 'green' : item.isInProgress === 1 ? 'yellow' : '#fff'
                        }]}>
                        <View style={[styles.list, { justifyContent: 'space-between', padding: 14, }]}>
                            <View style={{
                                width: '90%', flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={styles.indexBox}>
                                    <Image source={require('../../Assets/icon/list.png')}
                                        style={styles.icon1} />
                                </View>
                                <View>
                                    <Text style={styles.task}>{item.task}</Text>
                                    <Text style={styles.date}>{item.date}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => {
                                setVisible(true)
                                setActiveId(item.id)
                                setCurrentIdx(index)
                                setItems(item)
                            }}
                            >
                                <Image source={require('../../Assets/icon/more.png')}
                                    style={[styles.icons, {
                                        tintColor: '#f57e59'
                                    }]} />
                            </TouchableOpacity>

                        </View>
                    </TouchableOpacity>
                )
        )
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{

                backgroundColor: '#fff',
                padding: 15
            }}>
                <View style={styles.top}>
                    <Text style={styles.title}>Hello {username}</Text>
                    <Text style={styles.title1}>have a nice day!</Text>
                </View>
                <View style={styles.container}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {
                            jData.map((Item) => {
                                const backgroundColor = Item.id === selectedId ? "#fff" : "#e8e9eb";
                                return (
                                    <TouchableOpacity onPress={() => {
                                        handlePath(Item)
                                        setSelectedId(Item.id)
                                    }}
                                        style={[styles.btnContainer, {
                                            backgroundColor: backgroundColor,
                                            paddingHorizontal: WIDTH / 24,
                                            elevation: 10,
                                        }]}>
                                        <Text style={styles.btnText}>{Item.title}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={{
                padding: 15
            }}>
                {
                    type === 'Completed' ?
                        null
                        : type === 'Progress' ?
                            null
                            :
                            <View style={styles.midContainer}>
                                <Text style={styles.heading}>Tasks</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('CreateTask', { type: 'Create' })}

                                    style={[styles.btnContainer, {
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        width: 110,
                                        backgroundColor: '#f57e59'
                                    }]}>
                                    <Image source={require('../../Assets/icon/plus.png')}
                                        style={styles.icon} />
                                    <Text style={styles.txt}>Add task</Text>
                                </TouchableOpacity>
                            </View>
                }
                <View>
                    {
                        data.length === 0 ?
                            <Text style={styles.midText}>Add your task</Text>
                            :
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                style={{
                                    marginBottom:
                                        type === 'Completed' || type === 'Progress' ? HEIGHT * 0.26 : HEIGHT * .3, marginTop: '6%'
                                }}
                                data={data}
                                renderItem={renderItem}
                            />
                    }
                </View>
            </View>
            {popUp()}
        </View>
    )
}