import React from "react";
import { useGlobalContext } from "../context/context";
import styled from "styled-components";

const Followers = () => {
  const { followers } = useGlobalContext();

  return (
    <Wrapper>
      <div className="followers">
        {followers.map((follower, idx) => {
          const { html_url, login, avatar_url: image } = follower;
          return (
            <article key={idx} className="follower">
              <img src={image} alt={login} />
              <div>
                <h4>{login}</h4>
                <a href={html_url} target="_blank" rel="noreferrer">
                  {html_url}
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: var(--clr-white);
  border-top-right-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
  border-bottom-right-radius: var(--radius);
  position: relative;

  &::before {
    content: " followers";
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    background: var(--clr-white);
    color: var(--clr-grey-5);
    border-top-right-radius: var(--radius);
    border-top-left-radius: var(--radius);
    text-transform: capitalize;
    padding: 0.5rem 1rem 0 1rem;
    letter-spacing: var(--spacing);
    font-size: 1rem;
  }
  .followers {
    overflow: scroll;
    height: 260px;
    display: grid;
    grid-template-rows: repeat(auto-fill, minmax(45px, 1fr));
    gap: 1.25rem 1rem;
    padding: 1rem 2rem;
    scroll-behavior: smooth;
    overflow: auto;
  }

  .followers::-webkit-scrollbar {
    width: 5px;
    background-color: rgb(216, 204, 218);
    border-radius: 4px;
  }

  .followers::-webkit-scrollbar-thumb {
    background-color: rgb(204, 168, 209);
    border-radius: 4px;
  }
  .followers::-webkit-scrollbar:focus .followers::-webkit-scrollbar-thumb {
    background-color: rgb(156, 78, 150);
    border-radius: 4px;
  }

  article {
    transition: var(--transition);
    padding: 0.15rem 0.5rem;
    border-radius: var(--radius);
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 1rem;
    img {
      height: 100%;
      width: 45px;
      border-radius: 50%;
      object-fit: cover;
    }
    h4 {
      margin-bottom: 0;
    }
    a {
      color: var(--clr-grey-5);
    }
  }
`;
export default Followers;
