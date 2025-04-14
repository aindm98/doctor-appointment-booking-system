import React, { createContext, useState, useContext, ReactNode } from 'react';

const DataContext = createContext<DataContextType | undefined>(undefined);