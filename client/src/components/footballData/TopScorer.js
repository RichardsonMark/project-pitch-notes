import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { React, useState, useEffect } from "react";


const TopScorer = ({ }) => {
    const [scorer, setScorer] = useState(0);


    const getScorers = () => {
        fetch("http://localhost:8080/api/scorers")
            .then((res) => {
                return res.json()
            })
            .then((data) => {
                setScorer(data);
                // console.log(data);
            })
    };

    useEffect(() => {
        getScorers();
    }, []);
    //   console.log(scorer);
    console.log(scorer);

    if (!scorer) {
        return <p>Loading...</p>
    }


    return (
        <>
            <Paper elevation={3}>
                <TableContainer scorer={scorer}  >


                    <Table >
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell> </TableCell>
                                <TableCell>Goals</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {scorer.map((topScorer) => {
                                // console.log(teamStanding);

                                return (
                                    <TableRow key={topScorer.id}>
                                        <TableCell className="clubName">
                                            <img src={topScorer.team.crestUrl} width="50" height="50" alt="{teamStanding.team.name} crest" />
                                        </TableCell>
                                        <TableCell>{topScorer.name}</TableCell>
                                        <TableCell>{topScorer.numberOfGoals}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>

                </TableContainer>
            </Paper>
        </>
    )
}

export default TopScorer;