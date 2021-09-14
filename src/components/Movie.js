import { gql, useMutation } from "@apollo/client";
import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components";

const LIKE_MOVIE = gql`
    mutation togglelikeMovie($id:Int!) {
        togglelikeMovie(id:$id) @client
    }
`;
const Container = styled.div`
  height: 380px;
  width: 100%;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  /* overflow: hidden; */
  border-radius: 7px;
`;

export const Poster = styled.div`
  background-image: url(${props => props.bg});
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center center;
`;

export const Movie = ({ id, bg, isLiked }) => {
    const [togglelikeMovie] = useMutation(LIKE_MOVIE, {
        variables: {
            id: parseInt(id),
            isLiked
        }
    })
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg} />
            </Link>
            <button onClick={togglelikeMovie}>{isLiked ? "Unlike" : "Like"}</button>
        </Container >
    )
};