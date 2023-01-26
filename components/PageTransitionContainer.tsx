import React from 'react';
import { useRouter } from 'next/router';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

export default function PageTransitionContainer(props) {
    const router = useRouter();
    console.log("page props", props, router.route);

    return (
        <TransitionGroup className="wrapper h-full pt-16">
            <CSSTransition
                key={router.route}
                timeout={500}
                classNames="animation-page-container"
            >
                {props.children}
            </CSSTransition>
        </TransitionGroup>
    )
}
