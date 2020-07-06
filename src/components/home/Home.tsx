import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import HeadSection from './HeadSection';
import FeatureSection from './FeatureSection';
import Footer from '../footer/Footer';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
}));

interface IProps {
    selectHome: { (): void };
}

function Home(props: IProps): JSX.Element {
    const classes = useStyles();

    const { selectHome } = props;
    useEffect(() => {
        selectHome();
    }, [selectHome]);
    return (
        <main className={classes.content}>
            <HeadSection />
            <FeatureSection />
            <Footer />
        </main>
    );
}

export default Home;
