import type { SetStateAction } from 'react';
import { useState } from 'react';
import { z } from 'zod';

import { useBlogEditor } from '../../../use-blog-editor';
import type { BlogEditorFormTagFragmentResponse } from '../tag';

import { useSnackbar } from '@/hooks';
import { clientInBrowser, gql } from '@/lib/graphql';
import { Button } from '@/ui/foundation/button';
import { Modal, ModalPortal } from '@/ui/foundation/modal';
import { TextInput } from '@/ui/foundation/textInput';

const schema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
});

type Schema = z.infer<typeof schema>;

const TagCreateMutation = gql`
  mutation TagCreateMutation($input: TagInput!) {
    tag: createTag(input: $input) {
      id
      name
      slug
    }
  }
`;

type TagCreateMutationResponse = {
  tag: {
    id: number;
    name: string;
    slug: string;
  };
};

type TagCreateMutationVariables = {
  input: {
    name: string;
    slug: string;
  };
};

interface Props {
  setTagsOptionsState: (value: SetStateAction<BlogEditorFormTagFragmentResponse[]>) => void;
  isCreateNew: boolean;
  setIsCreateNew: (value: SetStateAction<boolean>) => void;
}

export const EditorFormTagCreate = ({ isCreateNew, setIsCreateNew, setTagsOptionsState }: Props) => {
  const { form: blogForm } = useBlogEditor();
  const { getValues, setValue } = blogForm;
  const [form, setForm] = useState({
    name: '',
    slug: '',
  });

  const { snack } = useSnackbar();

  const handleSubmit = async (data: Schema) => {
    try {
      schema.parse(data);
    } catch (err) {
      console.error(err);
      return;
    }

    const res = await clientInBrowser.request<TagCreateMutationResponse, TagCreateMutationVariables>(
      TagCreateMutation,
      {
        input: data,
      },
    );

    setTagsOptionsState((prev) => [...prev, res.tag]);
    snack(`Tag ${res.tag.name} created`);
    setValue('tagIds', [...getValues('tagIds'), res.tag.id]);
  };

  return (
    <ModalPortal>
      <Modal
        isOpen={isCreateNew}
        onClose={() => setIsCreateNew(false)}
        title="New Tag"
        footer={
          <>
            <Button variant="tertiary" onClick={() => setIsCreateNew(false)}>
              Cancel
            </Button>
            <Button onClick={() => handleSubmit(form)}>Create</Button>
          </>
        }
      >
        <TextInput
          label="Name"
          name="name"
          id="tag-name"
          placeholder="タグの名前"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
        />
        <TextInput
          label="Slug"
          name="slug"
          id="tag-slug"
          placeholder="タグのURLスラッグ"
          value={form.slug}
          onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
        />
      </Modal>
    </ModalPortal>
  );
};
