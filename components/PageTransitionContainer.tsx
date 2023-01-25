import React from 'react';
import { useRouter } from 'next/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function PageTransitionContainer(props) {
    const router = useRouter();
    console.log("page props", props, router.route);

    return (
        <TransitionGroup>
            <CSSTransition
                key={router.route}
                timeout={500}
                classNames="animation-page-container"
            >
                <div>{props.children}</div>
            </CSSTransition>
        </TransitionGroup>
    )
}
