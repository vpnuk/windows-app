import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

class Profile {
    constructor(
        type = 'OpenVPN',
        label = 'New profile',
        id = uuid()
    ) {
        this.type = type;
        this.label = label ?? 'New profile';
        this.id = id;
    }
    credentials = {
        login: '',
        password: ''
    };
    serverType = 'shared';
    server = {
        host: '',
        label: ''
    };
    details = {
        port: '1194',
        protocol: 'UDP',
        dns: { label: 'DNS: Default' }, // value: []
        mtu: { value: '' }
    }
    killSwitchEnabled = false;
};

const _currentProfile = settings =>
    settings.profiles
        .find(p => p.id === settings.currentProfile);

const _profilesAvailable = settings =>
    settings.profiles
        .filter(p => p.type === settings.connectionType);;

const defaultId = uuid();

export const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        connectionType: 'OpenVPN',
        profiles: [new Profile('OpenVPN', 'Default', defaultId)],
        currentProfile: defaultId
    },
    reducers: {
        increment: state => {
            state.value += 1
        },
        setConnectionType: (state, action) => {
            state.connectionType = action.payload;
        },
        setCurrentProfile: (state, action) => {
            state.currentProfile = action.payload;
        },
        setProfileName: (state, action) => {
            _currentProfile(state).label = action.payload;
        },
        addProfile: (state, action) => {
            var profile = new Profile(
                state.connectionType,
                action.payload
            );
            state.profiles = [
                ...state.profiles,
                profile
            ];
            state.currentProfile = profile.id;
        },
        deleteProfile: (state, action) => {
            var newProfiles = state.profiles.filter(p =>
                p.id !== action.payload);
            state.profiles = newProfiles?.length
                ? newProfiles // not empty
                : [new Profile(state.connectionType, 'Default')];
            var available = _profilesAvailable(state);
            state.currentProfile = available[available.length - 1].id;
        },
        setLogin: (state, action) => {
            _currentProfile(state).credentials.login = action.payload;
        },
        setPassword: (state, action) => {
            _currentProfile(state).credentials.password = action.payload;
        },
        setServer: (state, action) => {
            _currentProfile(state).server = action.payload;
        },
        setServerType: (state, action) => {
            _currentProfile(state).serverType = action.payload;
        },
        setPort: (state, action) => {
            _currentProfile(state).details.port = action.payload;
        },
        setProtocol: (state, action) => {
            _currentProfile(state).details.protocol = action.payload;
        },
        setDns: (state, action) => {
            _currentProfile(state).details.dns = action.payload;
        },
        setMtu: (state, action) => {
            _currentProfile(state).details.mtu = action.payload;
        },
        setKillSwitch: (state, action) => {
            _currentProfile(state).killSwitchEnabled = action.payload || false;
        }
    }
});

export const {
    increment,
    setConnectionType,
    setCurrentProfile,
    setProfileName,
    addProfile,
    deleteProfile,
    setLogin,
    setPassword,
    setServer,
    setServerType,
    setPort,
    setProtocol,
    setDns,
    setMtu,
    setKillSwitch
} = settingsSlice.actions;

export const selectConnectionType = state =>
    state.settings.connectionType;

export const selectCurrentProfile = state =>
    _currentProfile(state.settings);

export const selectProfilesAvailable = state =>
    _profilesAvailable(state.settings);

export const selectServer = state =>
    selectCurrentProfile(state).server;

export const selectServerType = state =>
    selectCurrentProfile(state).serverType;

export const selectServerName = state =>
    selectCurrentProfile(state).server.label;

export const selectLogin = state =>
    selectCurrentProfile(state).credentials.login;

export const selectDetails = state =>
    selectCurrentProfile(state).details;

export const selectKillSwitch = state =>
    selectCurrentProfile(state).killSwitchEnabled;

export default settingsSlice.reducer;