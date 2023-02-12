import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";

const Repos = () => {
  const { repos } = useGlobalContext();

  const repoData = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) return total;
    // If property does not exist, then create the property
    if (!total[language])
      total[language] = { label: language, value: 0, stars: 0 };
    total[language] = {
      ...total[language],
      value: total[language].value + 1,
      stars: total[language].stars + stargazers_count,
    };
    return total;
  }, {});

  // Sorting ccording to the most popular language and only showing first 5
  const repoLanguages = Object.values(repoData)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  // Calculating for most star repo and tranferring stars property to value,
  // so that fusion charts can work with data
  const repoStars = Object.values(repoData)
    .sort((a, b) => b.value - a.value)
    .map((item) => {
      if (item.stars === 0) return {};
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  // Stars and Fork
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[stargazers_count] = { label: name, value: stargazers_count };
      total.forks[forks] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );
  stars = Object.values(stars).slice(-5).reverse();
  forks = Object.values(forks).slice(-5).reverse();
  
  // dummy data
  const chartData = [
    {
      label: "HTML",
      value: "13",
    },
    {
      label: "CSS",
      value: "160",
    },
    {
      label: "JavaScript",
      value: "80",
    },
  ];

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D chartData={repoLanguages} />
        <Column3D chartData={stars} />
        <Doughnut2D chartData={repoStars} />
        <Bar3D chartData={forks} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
