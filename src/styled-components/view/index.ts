import styled from 'styled-components/native';

export const BasePageView = styled.View`
    background-color: ${props => props.theme.pageBackgroundColor};
    min-height: 100%;
`

export const ViewContainer = styled.View`
    background-color: ${props => props.theme.containerBackgroundColor};
`

export const ViewContainerSecondary = styled.View`
    background-color: ${props => props.theme.containerBackgroundColorSecondary};
`