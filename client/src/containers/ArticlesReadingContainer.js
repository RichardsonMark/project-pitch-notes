import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from "react";
import ArticleReadingList from '../components/articles/ArticleReadingList';
import ArticleReadingDetail from '../components/articles/ArticleReadingDetail';
import Request from '../helpers/request';
import { Grid, Button, Paper, Box, TextField } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import ArticleReading from '../components/articles/ArticleReading';




const ArticlesReadingContainer = () => {
    const [articles, setArticles] = useState([]);
    const [search, setSearch] = useState('');
    const [filteredArticles, setFilteredArticles] = useState([]);


    const requestAll = function () {
        const request = new Request();
        const articlePromise = request.get('http://localhost:8080/api/articles/read')

        Promise.all([articlePromise])
            .then((data) => {
                setArticles(data[0]);
                console.log(data[0]);
            })
    }

    useEffect(() => {
        requestAll()
    }, [])


    useEffect(() => {
        setFilteredArticles(
            articles.filter((article) =>
                article.categoryLeague.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, articles]);
    console.log(articles);



    if (!articles) {
        return null
    }
    return (

        <>
            {/* <h1>Read Articles</h1> */}
            <Grid container spacing={8}>
                <Box elevation={3}>
                    <ul>
                        <form noValidate autoComplete="off">
                            <TextField id="outlined-basic" label="filter by category/league" variant="outlined" fullWidth size="small" onChange={(e) => setSearch(e.target.value)} />
                        </form>
                    </ul>
                </Box>
                <Grid container spacing={0}>
                    <Paper elevation={3}>
                        {filteredArticles.map((article, index) => (
                                <ul>
                                    <li key={index} className="component-item">
                                <div className="component">
                                    <ArticleReading article={article} />
                                </div>
                                    </li>
                                </ul>
                        ))}
                    </Paper>
                </Grid>
                <Paper elevation={3}>
                <Pagination count={10} />
                </Paper>
            </Grid>
        </>

    )
}

export default ArticlesReadingContainer;