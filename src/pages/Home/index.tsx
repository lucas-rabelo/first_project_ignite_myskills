import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
} from 'react-native';

import { Button } from '../../components/Button';
import { SkillCard } from '../../components/SkillCard';

import { styles } from './styles';

export type SkillData = {
    id: string;
    name: string;
}

export function Home() {

    const [newSkill, setNewSkill] = useState('');
    const [mySkills, setMySkills] = useState<SkillData[]>([]);
    const [greeting, setGreeting] = useState('');

    function handleAddSkill() {
        const data = {
            id: String(new Date().getTime()),
            name: newSkill
        }
        setMySkills(oldState => [...oldState, data]);
    }

    function handleRemoveSkill(id: string) {
        setMySkills(oldState => oldState.filter(
            skill => skill.id !== id
        ));
    }

    useEffect(() => {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            setGreeting('Good Morning!');
        }
        else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon!')
        }
        else {
            setGreeting('Good Night!');
        }
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Welcome Lucas
            </Text>
            <Text style={styles.greetings}>
                {greeting}
            </Text>

            <TextInput
                style={styles.input}
                placeholder="New skill"
                placeholderTextColor='#555'
                onChangeText={setNewSkill}
                value={newSkill}
            />

            <Button
                onPress={handleAddSkill}
                activeOpacity={.7}
                title="Add"
            />

            <Text
                style={[styles.title, { marginVertical: 50 }]}
            >
                My Skills
            </Text>

            <FlatList
                data={mySkills}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <SkillCard
                        skill={item.name}
                        onPress={() => handleRemoveSkill(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}