import styled from 'styled-components/native';

export const CallToAction = styled.TouchableOpacity`
    background-color: ${props => props.theme.callToActionBackground};
    padding: 4px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const SecondaryCallToAction = styled.TouchableOpacity`
    background-color: ${props => props.theme.secondaryCallToActionBackground};
    padding: 4px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const CallToActionMD = styled.TouchableOpacity`
    background-color: ${props => props.theme.callToActionBackground};
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
`

export const CallToActionText = styled.Text`
    color: ${props => props.theme.callToActionTextColor};
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
`