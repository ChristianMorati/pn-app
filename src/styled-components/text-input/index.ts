import styled from 'styled-components/native';

export const Input = styled.TextInput`
    color: ${props => props.theme.color};
    padding: 8px 10px;
    background-color: ${props => props.theme.containerBackgroundColorSecondary};
    font-weight: 500;
`