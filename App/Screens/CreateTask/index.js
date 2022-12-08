import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { styles } from "./styles";
import { db } from "../../Utils/Database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from 'react-native-modern-datepicker';

export const CreateTask = ({ navigation, route }) => {

    const type = route.params.type;
    const title = route.params.task;
    const day = route.params.date;
    const [items, setItems] = useState(route.params.items);
    const description = route.params.desc
    const [task, setTask] = useState(title)
    const [desc, setDesc] = useState(description)
    const [data, setData] = useState([])
    const [date, setDate] = useState(day ? day : 'Select Date')
    const [open, setOpen] = useState(false)

    const handleLogout = async () => {
        await AsyncStorage.removeItem('auth')
        navigation.navigate('SignIn')
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            createTable()
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
    }, [navigation, data])

    const createTable = () => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, task TEXT,desc Text ,isChecked BIT, isInProgress BIT, date TEXT)'
            )
        })
    }

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM items', [],
                (obj, result) => {
                    const dt = result.rows._array
                    setData(dt)
                }
            )
        })
    }, [data, items])

    const addTask = () => {
        setTask('')
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO items (task, desc, date) VALUES (?,?,?)', [task, desc, date],
                (txObj, resultSet) =>
                    setData(data.concat([{ id: resultSet.insertId, task: task, desc: desc, date: date }])),
                (txObj, error) => console.log(error)
            )
        })
        navigation.navigate('Home')
    }

    const handleUpdate = () => {
        setTask('')
        db.transaction(tx => {
            tx.executeSql('UPDATE items SET task = ?, desc =?, date = ? WHERE id = ?', [task, desc, date, items.id],
                (txObj, resultSet) => {
                    if (resultSet.rowsAffected > 0) {
                        let arr = data.map((item) => {
                            if (item.id === items.id) {
                                return {
                                    ...item,
                                    task: task,
                                    desc: desc,
                                    date: date
                                }
                            }
                            return item
                        })
                        setData(arr)
                    }
                }
            )
        })
        navigation.navigate('Home')
    }

    const handleDatePicker = (date) => {
        setDate(date)
        setOpen(false)
    }

    return (
        <View
            style={styles.mainContainer}>
            <View style={{ padding: 20 }}>
                <View style={styles.textContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Assets/icon/arrow.png')}
                            style={[{ width: 18, height: 18, tintColor: '#fff' }]} />
                    </TouchableOpacity>
                    <Text style={styles.text}>{type === 'Create' ? 'Create Task ' : 'Update Task'}</Text>
                    <TouchableOpacity onPress={() => handleLogout()}>
                        <Image source={require('../../Assets/icon/logout.png')}
                            style={[styles.icon]} />
                    </TouchableOpacity>
                </View>

            </View>
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 85 }}>
                        <View style={styles.textBox}>
                            <Text style={styles.label}>Date</Text>
                            <TouchableOpacity onPress={() => setOpen(true)}>
                                <Text style={[styles.input, { color: date === 'Select Date' ? 'grey' : '#000' }]}>{date}</Text>
                            </TouchableOpacity>
                            {
                                open === true ?
                                    <DatePicker
                                        mode="calendar"
                                        onDateChange={date => handleDatePicker(date)}
                                    />
                                    :
                                    null
                            }
                        </View>

                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.label}>Task name</Text>
                        <TextInput
                            placeholder="Enter task name"
                            value={task}
                            onChangeText={t => setTask(t)}
                            style={[styles.input, { color: '#000' }]}
                        />
                    </View>
                    <View style={styles.textBox}>
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            placeholder="Description"
                            value={desc}
                            onChangeText={t => setDesc(t)}
                            multiline
                            style={[styles.input, { color: '#000' }]}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        onPress={() => {
                            type === 'Update' ?
                                handleUpdate()
                                :
                                addTask()
                        }}>
                        <Text style={[styles.input, { color: '#fff' }]}>{type === 'Update' ? 'Update Task' : 'Add task'}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    )
}