import Head from 'next/head'
import React from 'react'

type LayoutHeadProps = {
    title: string
    cover?: string
    description?: string
}

const LayoutHead = ({ title, cover, description }: LayoutHeadProps) => {
    return (
        <Head>
            <title>
                {`${title} | 新红旗`}
            </title>
            <meta name='application-name' content='《新红旗》社论' />
            <meta name='apple-mobile-web-app-capable' content='yes' />
            <meta name='apple-mobile-web-app-status-bar-style' content='default' />
            <meta name='apple-mobile-web-app-title' content='《新红旗》' />
            <meta name='format-detection' content='telephone=no' />
            <meta name='mobile-web-app-capable' content='yes' />
            <meta name='msapplication-config' content='/browserconfig.xml' />
            <meta name='msapplication-TileColor' content='#2B5797' />
            <meta name='msapplication-tap-highlight' content='no' />
            <meta name='theme-color' content='#000000' />
            <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
            <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
            <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
            <link rel='manifest' href='/manifest.json' />
            <link rel='mask-icon' href='/icons/safari-pinned-tab.svg' color='#5bbad5' />
            <link rel='shortcut icon' href='/favicon.ico' />
            <meta name='description' content={description ?? '《新红旗》，二十一世纪汉字文化圈的左翼报刊。为了无产阶级及其伟大事业而前进！'}></meta>
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@newhongqi' />
            <meta name='twitter:title' content={title} />
            <meta name='twitter:description' content='《新红旗》，为着无产阶级及其伟大的事业前进！' />
            <meta name='twitter:image' content={cover ?? 'https://bbvsukzcbmlmapdkuybx.supabase.co/storage/v1/object/public/bed/0.8322131189287469.jpg'} />
        </Head>
    )
}

export default LayoutHead
