/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { RequestManagerNotificationAction } from './RequestManagerNotificationAction';
import {
    RequestManagerNotificationActionFromJSON,
    RequestManagerNotificationActionFromJSONTyped,
    RequestManagerNotificationActionToJSON,
} from './RequestManagerNotificationAction';

/**
 * 
 * @export
 * @interface RequestManagerNotification
 */
export interface RequestManagerNotification {
    /**
     * 
     * @type {string}
     * @memberof RequestManagerNotification
     */
    type: string;
    /**
     * 
     * @type {string}
     * @memberof RequestManagerNotification
     */
    groupId: string;
    /**
     * 
     * @type {boolean}
     * @memberof RequestManagerNotification
     */
    isSeen: boolean;
    /**
     * 
     * @type {number}
     * @memberof RequestManagerNotification
     */
    seenAt?: number;
    /**
     * 
     * @type {Array<RequestManagerNotificationAction>}
     * @memberof RequestManagerNotification
     */
    actions: Array<RequestManagerNotificationAction>;
}

/**
 * Check if a given object implements the RequestManagerNotification interface.
 */
export function instanceOfRequestManagerNotification(value: object): value is RequestManagerNotification {
    let isInstance = true;
    isInstance = isInstance && "type" in value && value["type"] !== undefined;
    isInstance = isInstance && "groupId" in value && value["groupId"] !== undefined;
    isInstance = isInstance && "isSeen" in value && value["isSeen"] !== undefined;
    isInstance = isInstance && "actions" in value && value["actions"] !== undefined;

    return isInstance;
}

export function RequestManagerNotificationFromJSON(json: any): RequestManagerNotification {
    return RequestManagerNotificationFromJSONTyped(json, false);
}

export function RequestManagerNotificationFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestManagerNotification {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'groupId': json['group_id'],
        'isSeen': json['is_seen'],
        'seenAt': !exists(json, 'seen_at') ? undefined : json['seen_at'],
        'actions': ((json['actions'] as Array<any>).map(RequestManagerNotificationActionFromJSON)),
    };
}

export function RequestManagerNotificationToJSON(value?: RequestManagerNotification | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'group_id': value.groupId,
        'is_seen': value.isSeen,
        'seen_at': value.seenAt,
        'actions': ((value.actions as Array<any>).map(RequestManagerNotificationActionToJSON)),
    };
}

