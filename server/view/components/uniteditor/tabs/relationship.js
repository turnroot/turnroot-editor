import handleEvent from '../functions/handleRelationship.js'
import {w2form} from '../../../lib/w2ui.es6.min.js'

let relationship = new w2form({
    name: 'unit-editor-relationship-fields',
    fields: [
        {
            field: '',
            type: 'html',
            html: {
                html: '<h1>Relationships</h1>',
            }
        },
        {
            field: '',
            type: 'html',
            html: {
                html: '<h2>Max supports</h2>',
                column: 0,
            }
        },
        {
            field: 'html',
            type: 'html',
            html: {
                html: '',
                column: 0
            }
        },
        {
            field: '',
            type: 'html',
            html: {
                html: '<h2 style="margin-top:2.8rem;">Support speed</h2>',
                column: 1,
            }
        },
        {
            field: 'html',
            type: 'html',
            html: {
                html: '',
                column: 1
            }
        },
        {
            field: 'unit-editor-relationship-fields-parenting-header',
            type: 'html',
            html: {
                html: '<h2 style="margin-top:3.4rem;">Parenting</h2><br/><h3>Passed-down traits</h3></br><p>Child units can inherit traits from their parents. If both parents have a traits checked, the child will have either one or the other or a mix<sup>*</sup>. If just one parent has a trait checked. the child will have their trait. If neither has a trait checked, the child will use their default trait.</br></br><small><sup>*</sup>There\'s a 40% chance of getting the trait from parent 1, 40% from parent 2, and 20% chance of a 50/50 mix. Yes, we know that\'s not how genetics work.</small></p>',
                column: 0,
                class: 'no-label'
            }
        },
        {
            type: 'checks',
            field: 'unit-editor-relationship-fields-parenting-inheritances',
            html: {
                label: '',
                column: 0,
                class: 'check-row'
            },
            options: {
                items: [
                    'Eye color',
                    'Hair color',
                    'Skin color',
                    'Height'
                ]
            }
        },
        {
            type: 'html',
            field: 'unit-editor-relationship-fields-parenting-child-header',
            html: {
                html: '<h3 style = "margin-top:6.8rem">Child Unit</h3>',
                column: 1,
                class: 'no-label'
            }
        },
        {
            type: 'select',
            field: 'unit-editor-relationship-fields-parenting-child',
            html: {
                class: 'no-label',
                column: 1
            }
        },
        {
            type: 'html',
            field: 'unit-editor-relationship-fields-parenting-child-below',
            html: {
                html: '<p><highlight>Important!</highlight> If two units with a set child unit S support and have a child, their child will be one of the two selected randomly. In traditional TTRPG games the child unit is always set on the mother. Turnroot allows same-sex couples to have children, which makes guaranteed child units impossible.<br/><br/>You should set a unique child unit on each parent and not worry about it. Just be aware that not all child units may be spawned in-game. Alternatively, you can have two children per couple so all child units are spawned.</p>',
                column: 1,
                class: 'no-label'
        }
    },
    {
        type: 'html',
        field: 'unit-editor-relationship-fields-adjutant-header',
        html: {
            html: '<h2 style="margin-top:2.8rem;">Adjutant</h2><br/><p>If this unit is assigned as an adjutant, it will:</p>',
            column: 0,
            class: 'no-label'
        }
    },
    {
        type: 'radio',
        field: 'unit-editor-relationship-fields-adjutant-does',
        options: {
            items: [
                'Guard',
                'Attack',
                'Heal'
            ]
        },
        html: {
            column: 0
        }
    },
    {
        type: 'number',
        field: 'unit-editor-relationship-fields-adjutant-chance-none-level-support',
        html: {
            label: '% Chance at no support',
            column: 0
        }
    },
    {
        type: 'number',
        field: 'unit-editor-relationship-fields-adjutant-chance-d-level-support',
        html: {
            label: '% Chance at D-level support',
            column: 0
        }
    },
    {
        type: 'number',
        field: 'unit-editor-relationship-fields-adjutant-chance-c-level-support',
        html: {
            label: '% Chance at C-level support',
            column: 0
        }
    },
    {
        type: 'number',
        field: 'unit-editor-relationship-fields-adjutant-chance-b-level-support',
        html: {
            label: '% Chance at B-level support',
            column: 0
        }
    },
    {
        type: 'number',
        field: 'unit-editor-relationship-fields-adjutant-chance-a-level-support',
        html: {
            label: '% Chance at A-level support',
            column: 0
        }
    },
    {
        type: 'number',
        field: 'unit-editor-relationship-fields-adjutant-chance-s-level-support',
        html: {
            label: '% Chance at S-level support',
            column: 0
        }
    },
    {
        type: 'html',
        field: 'unit-editor-relationship-fields-pairup-header',
        html: {
            html: '<h2 style="margin-top:2.8rem;">Pair-up</h2>',
            column: 1,
            class: 'no-label'
        }
    }
    ],
    record: {}
})

window.unitEditorRelationshipFields = relationship

export default relationship