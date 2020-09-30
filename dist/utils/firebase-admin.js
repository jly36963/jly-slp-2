"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
// imports
var firebase_admin_1 = __importDefault(require("firebase-admin"));
// app
var projectId = 'jly-slp-2';
var app = firebase_admin_1.default.initializeApp({ projectId: projectId });
// auth
exports.auth = app.auth();
