'use client'
import React from 'react';
import clsx from 'clsx';

type LinkButtonProps = {
    href: string;
    // add more types in future
    // type: 'youtube';
};

const LinkButton: React.FC<LinkButtonProps> = ({
    href,
    // type,
}) => {
    const bgUrl = "bg-[url('../assets/youtube.jpg')]";

    return (
        <a
            href={href}
            target='_blank'
            rel="noopener noreferrer"
            className={clsx(`${bgUrl} bg-cover bg-center w-8 h-8`)}
        />
    );
}

export default LinkButton;