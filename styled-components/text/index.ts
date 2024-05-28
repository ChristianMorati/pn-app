import styled from 'styled-components/native';

export const Paragraph = styled.Text`
    padding: 1px 0;
    color: ${props => props.theme.color};
`

export const ParagraphSemibold = styled.Text`
    color: ${props => props.theme.color};
    padding: 1px 2px;
    font-weight: 500;
`

export const ParagraphBold = styled.Text`
    color: ${props => props.theme.titleColor};
    padding: 4px;
    font-weight: bold;
`

export const Title = styled.Text`
    color: ${props => props.theme.titleColor};
    font-weight: 600;
    font-size: 18px;
`
