import React from "react";

import createReactClass from "create-react-class";

import PropTypes from "prop-types";

import Styles from "./metadata-table.scss";

/**
 * Displays a table showing the name and values of items in a MetadataItem.
 */
const MetadataTable = createReactClass({
  displayName: "MetadataTable",

  propTypes: {
    metadataItem: PropTypes.object.isRequired // A MetadataItem instance.
  },

  render() {
    const metadataItem = this.props.metadataItem;
    const keys = Object.keys(metadataItem);
    const isArr =
      Array.isArray(metadataItem) ||
      metadataItem.constructor.name === "ObservableArray";
    if (keys.length === 0 && !isArr) return null;

    return (
      <div className={Styles.root}>
        <table>
          <tbody>
            <Choose>
              <When condition={isArr}>
                <If
                  condition={
                    metadataItem.length > 0 && isJoinable(metadataItem)
                  }
                >
                  {metadataItem.join(", ")}
                </If>
              </When>
              <When condition={keys.length > 0 && !isArr}>
                <For each="key" index="i" of={keys}>
                  <tr key={i}>
                    <th className={Styles.name}>{key}</th>
                    <td className={Styles.value}>
                      <Choose>
                        <When condition={typeof metadataItem[key] === "object"}>
                          <MetadataTable metadataItem={metadataItem[key]} />
                        </When>
                        <When
                          condition={
                            Array.isArray(metadataItem[key]) ||
                            metadataItem[key].constructor.name ===
                              "ObservableArray"
                          }
                        >
                          <If
                            condition={
                              metadataItem[key].length > 0 &&
                              isJoinable(metadataItem[key])
                            }
                          >
                            {metadataItem[key].join(", ")}
                          </If>
                        </When>
                        <Otherwise>{metadataItem[key]}</Otherwise>
                      </Choose>
                    </td>
                  </tr>
                </For>
              </When>
            </Choose>
          </tbody>
        </table>
      </div>
    );
  }
});

/**
 * @param  {Object}  obj
 * @return {Boolean} Returns true if the object obj is a string or a number.
 * @private
 */
function isStringOrNumber(obj) {
  return (
    typeof obj === "string" || obj instanceof String || !isNaN(parseFloat(obj))
  );
}

/**
 * @param  {Array} array
 * @return {Boolean} Returns true if the array only contains objects which can be joined.
 * @private
 */
function isJoinable(array) {
  console.log(array, array.every(isStringOrNumber));
  return array.every(isStringOrNumber);
}

export default MetadataTable;
