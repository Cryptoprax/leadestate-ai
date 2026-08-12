"use client";import{useMemo}from"react";import{getBuilderRegistry}from"../services/registry.service";export function useBuilderRegistry(){return useMemo(()=>getBuilderRegistry(),[])}
