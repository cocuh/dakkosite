"use strict";
import Top from './components/top'
import React from 'react';

document.addEventListener('DOMContentLoaded', function () {
    const mountNode = document.getElementById('content');
    React.render((<Top r="50"/>), mountNode, function () {
    })
});