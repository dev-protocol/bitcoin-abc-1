import styled from 'styled-components';
import Link from 'next/link';

export const DescriptionBox = styled.div`
    width: 100%;
    margin-bottom: -100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${props => props.theme.breakpoint.medium} {
        flex-direction: column;
        margin-bottom: 40px;
    }
`;

export const ImgCtn = styled.div`
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: ${props => props.height};
    margin-left: 20px;
    ${props => props.theme.filters.grayscale}

    img {
        object-fit: contain;
    }
    ${props => props.theme.breakpoint.medium} {
        width: 100%;
        height: 250px;
    }
`;

export const TitleBox = styled.div`
    width: 100%;
    border-left: 3px solid ${props => props.theme.colors.primary};
    background-image: linear-gradient(
        90deg,
        ${props => props.theme.colors.black},
        transparent 93%
    );
    margin-top: 40px;
    margin-bottom: 40px;
    padding: 10px 20px;
    font-size: 16px;
    text-transform: uppercase;
`;

export const TilesOuterCtn = styled.div`
    width: 100%;
    margin-bottom: 100px;
    position: relative;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
`;

export const TileImgCtn = styled.div`
    width: 100%;
    height: 60px;
    position: relative;
    opacity: 0.6;
    transition: all 200ms ease-in-out;

    img {
        object-fit: contain;
    }
`;

export const Tile = styled(Link)`
    position: relative;
    padding: 50px;
    border-right: 1px solid ${props => props.theme.colors.gridlines};
    border-top: 1px solid ${props => props.theme.colors.gridlines};

    :nth-child(3n + 0) {
        border-right: none;
    }

    :nth-child(-n + 3) {
        border-top: none;
    }

    &:hover ${TileImgCtn} {
        opacity: 1;
    }
    ${props => props.theme.breakpoint.medium} {
        padding: 30px;
    }
    ${props => props.theme.breakpoint.small} {
        padding: 10px;
    }
`;

export const BlankTile = styled.div`
    border-right: none;
    border-top: 1px solid ${props => props.theme.colors.gridlines};

    :nth-child(3n + 0) {
        border-right: none;
    }
`;