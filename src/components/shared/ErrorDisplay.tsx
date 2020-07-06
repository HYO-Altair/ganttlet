import React from 'react';

import Typography from '@material-ui/core/Typography';

const errorMappings = new Map<string, string>();
errorMappings.set('required', 'Required');
errorMappings.set('minLength', 'Too Short');
errorMappings.set('maxLength', 'Too Long');
errorMappings.set('validate', 'Account Exists');

export default function ErrorDisplay(props: { type: string }): JSX.Element {
    return (
        <Typography color="error" className="error">
            {errorMappings.get(props.type)}
        </Typography>
    );
}
